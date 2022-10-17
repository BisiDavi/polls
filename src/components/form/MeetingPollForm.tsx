import ForgeUI, {
  Heading,
  Form,
  useState,
  TextField,
  DatePicker,
} from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

import PollsFieldSet from "./PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";

export default function MeetingPollForm({ actionButton }: any) {
  const [formState, setFormState] = useState(undefined);
  const [agenda, setAgenda] = useState(["Agenda 1"]);
  const [meetingId, setMeetingId] = useContentProperty('meetingId', 0)
  const [meetingContent, setMeetingContent] = useContentProperty(
    "meeting-poll",
    undefined
  );

  const onSubmit = async (formData) => {
    const agendaObj = formatFormPoll(agenda);
    formData: {
      title: "";
      link: "";
      meetingDate: "";
      type: "meetingPoll";
    }
    setFormState({ ...agendaObj, ...formData });
  };

  console.log("formState", formState);

  return (
    <Form
      submitButtonAppearance="primary"
      actionButtons={actionButton}
      onSubmit={onSubmit}
    >
      <Heading>Meeting Poll Form</Heading>
      <TextField
        name="title"
        label="Meeting Title"
        placeholder="Enter your Meeting Title"
        isRequired
      />
      <TextField
        name="link"
        label="Meeting Link"
        placeholder="zoom/google meet/any video call link"
      />
      <DatePicker
        name="meetingDate"
        placeholder="Select Date"
        label="Pick Meeeting Date"
        isRequired
      />
      <PollsFieldSet type="meeting" poll={agenda} setPoll={setAgenda} />
    </Form>
  );
}
