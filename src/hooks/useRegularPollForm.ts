import { useEffect, useState } from "@forge/ui";

export default function useRegularPollForm(
  formState,
  setFormState,
  setPollResult
) {
  const [regularFormData, setRegularFormData] = useState("");

  useEffect(() => {
    if (formState !== undefined && regularFormData.length === 0) {
      setRegularFormData(formState);
      setPollResult("Regular-View");
    }
  }, [formState, regularFormData]);

  const onSubmit = async (formData, pollObj) => {
    const date = new Date();
    formData: {
      title: "";
      description: "";
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
