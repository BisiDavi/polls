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
  const [agenda, setAgenda] = useState(["Agenda 1"]);
  const [meetingPollData, setMeetingPollData] = useContentProperty(
    "meetingPollData",
    ""
  );

  console.log("meetingPollData", meetingPollData);

  useEffect(() => {
    if (formState !== undefined) {
      const dateStatus = isDateValid(formState.meetingDate);
      setValidDate(dateStatus);
    }
  }, [formState]);

  useEffect(async () => {
    if (formState !== undefined && validDate) {
      await setMeetingPollData(formState).then(() => {
        setPollType("Meeting-View");
      });
    }
  }, [formState, validDate]);

  async function onSubmit(formData) {
    const date = new Date();
    const agendaObj = formatFormPoll(agenda);
    formData: {
      title: "";
      link: "";
      description: "";
      meetingDate: "";
      duration: "";
      time: "";
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
