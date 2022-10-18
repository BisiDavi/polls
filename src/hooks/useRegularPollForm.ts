import ForgeUI, {
  Form,
  useState,
  TextField,
  Heading,
  TextArea,
  Fragment,
} from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

export default function useRegularPollForm() {
  const [regularPolls, setRegularPolls] = useState(["Poll Option 1"]);
  const [regularFormData, setRegularFormData] = useContentProperty(
    "regularFormData",
    ""
  );
  console.log("formState", formState);
  const date = new Date();

  console.log("regularFormData-RegularPollForm", regularFormData);

  const onSubmit = async (formData) => {
    const pollObj = formatFormPoll(regularPolls);
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
}
