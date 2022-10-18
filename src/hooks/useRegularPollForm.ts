import { useContentProperty } from "@forge/ui-confluence";

export default function useRegularPollForm(setFormState) {
  const [regularFormData, setRegularFormData] = useContentProperty(
    "regularFormData",
    ""
  );
  const date = new Date();

  console.log("regularFormData-RegularPollForm", regularFormData);

  const onSubmit = async (formData, pollObj) => {
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
  };
}
