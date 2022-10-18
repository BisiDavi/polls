import ForgeUI, {
  Heading,
  Form,
  useState,
  TextField,
  TextArea,
  DatePicker,
  Button,
  Fragment,
} from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

import PollsFieldSet from "./PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";
import isDateValid from "../../lib/isDateValid";

export default function MeetingPollForm({ actionButton }: any) {
  const [formState, setFormState] = useState(undefined);
  const [agenda, setAgenda] = useState(["Topic 1"]);
  const [meetingId, setMeetingId] = useContentProperty("meetingId", 0);
  const [meetingContent, setMeetingContent] = useContentProperty(
    `meeting-poll-${meetingId}`,
    ""
  );
  const [count, setCount] = useContentProperty("count", 0);

  console.log("count", count);

  async function updateMeetingId() {
    await setMeetingId(meetingId + 1);
  }

  async function updateMeetingContent(meetingData) {
    await setMeetingContent(meetingData);
  }
  const date = new Date();

  const onSubmit = async (formData) => {
    const agendaObj = formatFormPoll(agenda);
    formData: {
      title: "";
      link: "";
      meetingDate: "";
      description: "";
      type: "meetingPoll";
      date: date.toISOString();
    }
    setFormState({ ...agendaObj, ...formData });
    updateMeetingId();
    await setMeetingId(meetingId + 1);
    await setMeetingContent(formState);
  };

  const isMeetingDateValid = formState
    ? isDateValid(formState.meetingDate)
    : false;

  console.log("formState", formState);
  console.log("meetingId", meetingId);
  console.log("meetingContent", meetingContent);

  return (
    <Fragment>
      <Button
        text={`Count is ${count}`}
        appearance="primary"
        onClick={async () => {
          await setCount(count + 1);
        }}
      />
      <Form
        submitButtonAppearance="primary"
        actionButtons={actionButton}
        onSubmit={onSubmit}
      >
        <Heading>Meeting Poll Form</Heading>
        {isMeetingDateValid && (
          <Button
            text="Invalid date, meeting date must be in the future or today"
            onClick={() => null}
            appearance="danger"
            icon="error"
            iconPosition="before"
          />
        )}
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
        <TextArea label="Meeting Description" spellCheck name="description" />
        <PollsFieldSet type="meeting" poll={agenda} setPoll={setAgenda} />
      </Form>
    </Fragment>
  );
}
