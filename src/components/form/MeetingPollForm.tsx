import ForgeUI, { Heading, Form, useState, TextField } from "@forge/ui";

export default function MeetingPollForm({ actionButton }: any) {
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
      <Heading>Meeting Poll Form</Heading>
      <TextField name="title" label="Meeting Title" />
      <TextField
        name="link"
        label="Meeting Link"
        placeholder="zoom/google meet/any link"
      />
    </Form>
  );
}
