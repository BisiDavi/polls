import ForgeUI, { Form, useState, TextField, Heading } from "@forge/ui";
import PollsFieldSet from "./PollsFieldSet";

export default function RegularPollForm({ actionButton }: any) {
  const [formState, setFormState] = useState(undefined);

  const onSubmit = async (formData) => {
    formData: {
      title: "";
      link: "";
    }
    setFormState(formData);
  };
  return (
    <Form
      submitButtonAppearance="primary"
      actionButtons={actionButton}
      onSubmit={onSubmit}
    >
      <Heading>Regular Poll Form</Heading>
      <TextField name="title" label="Meeting Title" />
      <TextField
        name="link"
        label="Meeting Link"
        placeholder="zoom/google meet/any link"
      />
      <PollsFieldSet type="regular" />
    </Form>
  );
}
