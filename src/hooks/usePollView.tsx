import { useState } from "@forge/ui";

import useRegularPollForm from "./useRegularPollForm";
import useMeetingPollForm from "./useMeetingPollForm";

export default function usePollView(setPollType, viewType: string) {
  const [formState, setFormState] = useState(undefined);

  const { onSubmit: onSubmitRegular, regularFormData } = useRegularPollForm(
    formState,
    setFormState,
    setPollType
  );

  const {
    validDate,
    meetingPollData,
    onSubmit: onSubmitMeeting,
    agenda,
    setAgenda,
  } = useMeetingPollForm(formState, setFormState, setPollType);

  const data = viewType === "Regular" ? regularFormData : meetingPollData;

  console.log("viewType", viewType);
  console.log("regularFormData", regularFormData);
  console.log("meetingPollData", meetingPollData);
  console.log("data-usePollView", data);

  return {
    data,
    onSubmitRegular,
    onSubmitMeeting,
    validDate,
    agenda,
    setAgenda,
  };
}
