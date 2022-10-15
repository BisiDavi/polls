import ForgeUI, { Text, Form, useState, TextField } from "@forge/ui";

export default function MeetingForm() {
  const [formState, setFormState] = useState(undefined);

  const onSubmit = async (formData) => {
    formData: {
      title: "";
      link: "";
    }
    setFormState(formData);
  };
  return (
    <Form onSubmit={onSubmit}>
      <Text>
        1. Let your team-mate vote on meeting agenda based on priority
      </Text>
      <TextField name="title" label="Meeting Title" />
      <TextField
        name="link"
        label="Meeting Link"
        placeholder="zoom/google meet/any link"
      />
    </Form>
  );
}
