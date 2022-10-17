import ForgeUI, {
  Form,
  useState,
  TextField,
  Heading,
  TextArea,
} from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

import PollsFieldSet from "./PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";

export default function RegularPollForm({ actionButton }: any) {
  const [formState, setFormState] = useState(undefined);
  const [regularPolls, setRegularPolls] = useState(["Poll Option 1"]);
  const [meetingId] = useContentProperty("meetingId", 0);
  console.log("meetingId", meetingId);

  console.log("formState", formState);
  const date = new Date();

  const onSubmit = async (formData) => {
    const pollObj = formatFormPoll(regularPolls);
    formData: {
      title: "";
      link: "";
      description: "";
      type: "regularMeetingPoll";
      date: date.toISOString();
    }
    setFormState({ ...pollObj, ...formData });
  };
  return (
    <Form
      submitButtonAppearance="primary"
      actionButtons={actionButton}
      onSubmit={onSubmit}
    >
      <Heading>Regular Poll Form</Heading>
      <TextField name="title" label="Poll Title" isRequired />
      <TextArea spellCheck label="Poll Description" name="description" />

      <PollsFieldSet
        type="regular"
        poll={regularPolls}
        setPoll={setRegularPolls}
      />
    </Form>
  );
}
