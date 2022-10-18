import ForgeUI, {
  Heading,
  Form,
  useState,
  TextField,
  TextArea,
  DatePicker,
  Button,
  useEffect,
} from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

import PollsFieldSet from "./PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";
import isDateValid from "../../lib/isDateValid";

export default function MeetingPollForm({ actionButton }: any) {
  const [formState, setFormState] = useState(undefined);
  const [validDate, setValidDate] = useState(null);
  const [agenda, setAgenda] = useState(["Topic 1"]);
  const [meetingId, setMeetingId] = useContentProperty("meetingId", 0);
  const [meetingContent, setMeetingContent] = useContentProperty(
    "meetingFormData",
    ""
  );

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
    // await setMeetingId(meetingId + 1);
  };

  // useEffect(async () => {
  //   if (formState !== undefined && meetingContent.length === 0) {
  //     await setMeetingContent(formState);
  //   }
  // }, [formState, meetingContent]);

  useEffect(() => {
    if (formState !== undefined) {
      const dateStatus = isDateValid(formState.meetingDate);
      console.log(
        "dateStatus",
        dateStatus,
        "formState.meetingDate",
        formState.meetingDate
      );
      setValidDate(dateStatus);
    }
  }, [formState]);

  console.log("validDate", validDate);

  console.log("formState", formState);
  console.log("meetingId", meetingId);
  console.log("meetingFormData", meetingContent);

  return (
    <Form
      submitButtonAppearance="primary"
      actionButtons={actionButton}
      onSubmit={onSubmit}
    >
      <Heading>Meeting Poll Form</Heading>
      {validDate !== null && !validDate && (
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
  );
}
