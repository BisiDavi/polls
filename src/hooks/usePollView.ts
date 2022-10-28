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

  console.log("viewType", viewType);

  const data = viewType === "Regular" ? regularFormData : meetingPollData;

  return {
    data,
    onSubmitRegular,
    onSubmitMeeting,
    validDate,
    agenda,
    setAgenda,
  };
}
