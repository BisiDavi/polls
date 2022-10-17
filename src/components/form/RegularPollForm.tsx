import ForgeUI, { Form, useState, TextField, Heading } from "@forge/ui";

import PollsFieldSet from "./PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";

export default function RegularPollForm({ actionButton }: any) {
  const [formState, setFormState] = useState(undefined);
  const [regularPolls, setRegularPolls] = useState(["Poll Option 1"]);

  console.log("formState", formState);

  const onSubmit = async (formData) => {
    const pollObj = formatFormPoll(regularPolls);
    formData: {
      title: "";
      link: "";
      type: "regularMeetingPoll";
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
      <PollsFieldSet
        type="regular"
        poll={regularPolls}
        setPoll={setRegularPolls}
      />
    </Form>
  );
}
