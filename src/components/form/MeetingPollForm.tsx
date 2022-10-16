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
import { formatFormPoll } from "../../lib/getAgendaName";

export default function MeetingPollForm({ actionButton }: any) {
  const [formState, setFormState] = useState(undefined);
  const [agenda, setAgenda] = useState(["Agenda 1"]);

  console.log("formState", formState);

  const onSubmit = async (formData) => {
    const agendaObj = formatFormPoll(agenda);
    formData: {
      title: "";
      link: "";
      meetingDate: "";
    }
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
        placeholder="zoom/google meet/any video call link"
        isRequired
      />
      <DatePicker
        name="meetingDate"
        placeholder="Pick Meeting Date"
        label="Pick Meeeting Date"
        isRequired
      />
      <PollsFieldSet type="meeting" poll={agenda} setPoll={setAgenda} />
    </Form>
  );
}
