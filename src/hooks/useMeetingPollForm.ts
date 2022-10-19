import { useState, useEffect } from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

import isDateValid from "../lib/isDateValid";
import { formatFormPoll } from "../lib/getAgendaName";

export default function useMeetingPollForm(
  formState,
  setFormState,
  setPollType
) {
  const [validDate, setValidDate] = useState(null);
  const [agenda, setAgenda] = useState(["Topic 1"]);
  const [meetingPollData, setMeetingPollData] = useContentProperty(
    "meetingPollData",
    ""
  );
  useEffect(() => {
    if (formState !== undefined) {
      const dateStatus = isDateValid(formState.meetingDate);
      setValidDate(dateStatus);
    }
  }, [formState]);

  useEffect(async () => {
    if (formState !== undefined && meetingPollData.length === 0 && validDate) {
      await setMeetingPollData(formState);
      setPollType("Meeting-View");
    }
  }, [formState, meetingPollData, validDate]);

  async function onSubmit(formData) {
    const date = new Date();
    const agendaObj = formatFormPoll(agenda);
    formData: {
      title: "";
      link: "";
      description: "";
      meetingDate: "";
      duration: "";
    }
    setFormState({
      ...agendaObj,
      ...formData,
      type: "meetingPoll",
      date: date.toISOString(),
    });
  }

  return {
    validDate,
    meetingPollData,
    onSubmit,
    agenda,
    setAgenda,
  };
}
