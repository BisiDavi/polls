import ForgeUI, {
  Heading,
  Form,
  useState,
  TextField,
  Text,
  Fragment,
  Tooltip,
  Button,
  ButtonSet,
} from "@forge/ui";

export default function MeetingPollForm({ actionButton }: any) {
  const [formState, setFormState] = useState(undefined);
  const [agenda, setAgenda] = useState(["Agenda 1"]);

  console.log("agenda", agenda);

  const onSubmit = async (formData) => {
    formData: {
      title: "";
      link: "";
    }
    setFormState(formData);
  };

  function removeAgendaHandler() {
    const agendaTemp = agenda;
    agendaTemp.splice(agendaTemp.length - 1, 1);
    setAgenda([...agendaTemp]);
  }

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
      <ButtonSet>
        <Button
          icon="add"
          text="Add Meeting Agenda"
          appearance="primary"
          iconPosition="before"
          onClick={() => setAgenda([...agenda, `Agenda ${agenda.length + 1}`])}
        />
        <Button
          icon="trash"
          text="Remove Meeting Agenda"
          appearance="danger"
          iconPosition="before"
          onClick={removeAgendaHandler}
        />
      </ButtonSet>
      {agenda.map((item, index) => {
        const agendaCount = index + 1;
        const itemSplit = item.split(" ")[0].toLowerCase();
        const name = `${itemSplit}-${agendaCount}`;
        return (
          <TextField
            name={name}
            label={item}
            placeholder={`what's the meeting agenda ${agendaCount}`}
          />
        );
      })}
    </Form>
  );
}
