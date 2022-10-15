import ForgeUI, {
  Heading,
  Form,
  useState,
  TextField,
  Button,
  ButtonSet,
  DatePicker,
} from "@forge/ui";
import PollsFieldSet from "./PollsFieldSet";

export default function MeetingPollForm({ actionButton }: any) {
  const [formState, setFormState] = useState(undefined);
  const [agenda, setAgenda] = useState(["Agenda 1"]);

  console.log("formState", formState);

  function getAgendaName(item: string, index: number) {
    const agendaCount = index + 1;
    const itemSplit = item.split(" ")[0].toLowerCase();
    const name = `${itemSplit}-${agendaCount}`;
    return { agendaCount, name };
  }

  const onSubmit = async (formData) => {
    const agendaObj = {};
    agenda.map((item, index) => {
      const { name } = getAgendaName(item, index);
      agendaObj[name] = "";
    });
    formData: {
      title: "";
      link: "";
      meetingDate: "";
    }
    console.log("agendaObj", agendaObj);
    setFormState({ ...agendaObj, ...formData });
  };



  return (
    <Form
      submitButtonAppearance="primary"
      actionButtons={actionButton}
      onSubmit={onSubmit}
    >
      <Heading>Meeting Poll Form</Heading>
      <TextField name="title" label="Meeting Title" isRequired />
      <TextField
        name="link"
        label="Meeting Link"
        placeholder="zoom/google meet/any link"
        isRequired
      />
      <DatePicker
        name="meetingDate"
        placeholder="Pick Meeting Date"
        label="Pick Meeeting Date"
        isRequired
      />
      <PollsFieldSet type="meeting" />
    </Form>
  );
}
