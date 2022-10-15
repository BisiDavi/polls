import ForgeUI, { Text, Form, useState, TextField } from "@forge/ui";

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
    <Form onSubmit={onSubmit} actionButtons={actionButton}>
      <Text>Meeting Poll Form</Text>
      <TextField name="title" label="Meeting Title" />
      <TextField
        name="link"
        label="Meeting Link"
        placeholder="zoom/google meet/any link"
      />
    </Form>
  );
}