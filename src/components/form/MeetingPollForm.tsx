import ForgeUI, {
  Heading,
  Form,
  useState,
  TextField,
  TextArea,
  useEffect,
  DatePicker,
} from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

import PollsFieldSet from "./PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";

export default function MeetingPollForm({ actionButton }: any) {
  const [formState, setFormState] = useState(undefined);
  const [agenda, setAgenda] = useState(["Topic 1"]);
  // const [submitForm, setSubmitForm] = useState(false);
  const [meetingId, setMeetingId] = useContentProperty("meetingId", 0);
  const [meetingContent, setMeetingContent] = useContentProperty(
    `meeting-poll-${meetingId}`,
    ""
  );

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
    updateMeetingContent(formState);
    // setSubmitForm(true);
  };

  // useEffect(() => {
  //   if (submitForm) {
  //     console.log("done");
  //     updateMeetingContent(formState).then(() => {
  //       setSubmitForm(false);
  //     });
  //   }
  // }, [meetingId, submitForm]);

  console.log("formState", formState);
  console.log("meetingId", meetingId);
  console.log("meetingContent", meetingContent);

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
      <TextArea label="Meeting Description" spellCheck name="description" />
      <PollsFieldSet type="meeting" poll={agenda} setPoll={setAgenda} />
    </Form>
  );
}
