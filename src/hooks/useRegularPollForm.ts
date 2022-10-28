import { useEffect } from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

export default function useRegularPollForm(
  formState,
  setFormState,
  setPollType
) {
  const [regularFormData, setRegularFormData] = useContentProperty(
    "regularFormData",
    ""
  );

  useEffect(async () => {
    if (formState !== undefined && formState.type === "regularMeetingPoll") {
      await setRegularFormData(formState).then(() => {
        setPollType("Regular-View");
      });
    }
  }, [formState]);

  const onSubmit = async (formData, pollObj) => {
    const date = new Date();
    formData: {
      title: "";
      description: "";
      hideVotes: [""];
      pollDuration: "";
    }
    setFormState({
      ...pollObj,
      ...formData,
      type: "regularMeetingPoll",
      date: date.toISOString(),
    });
  };

  return {
    onSubmit,
    regularFormData,
  };
}
