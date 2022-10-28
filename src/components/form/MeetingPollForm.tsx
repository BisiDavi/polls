import ForgeUI, {
  Heading,
  Form,
  TextField,
  TextArea,
  DatePicker,
  SectionMessage,
  Text,
} from "@forge/ui";

import PollsFieldSet from "./PollsFieldSet";

export default function MeetingPollForm({
  validDate,
  agenda,
  setAgenda,
  onSubmit,
}) {
  return (
    <Form submitButtonAppearance="primary" onSubmit={onSubmit}>
      <Heading>Meeting Poll Form</Heading>
      {validDate !== null && !validDate && (
        <SectionMessage title="Invalid Date" appearance="error">
          <Text>Invalid date, meeting date must be in the future or today</Text>
        </SectionMessage>
      )}
      <TextField
        name="title"
        label="Meeting Title"
        placeholder="Enter your Meeting Title"
        isRequired
      />
      <DatePicker
        name="meetingDate"
        placeholder="Select Date"
        label="Pick Meeeting Date"
        isRequired
      />
      <TextField
        name="duration"
        label="Meeting Duration Estimate"
        placeholder="Allotted time for the meeting in (hr(s)/mins)?"
      />
      <TextField
        name="time"
        label="Meeting Starts At"
        placeholder="Time for the meeting"
        isRequired
      />
      <TextArea label="Meeting Description" spellCheck name="description" />
      <PollsFieldSet type="meeting" poll={agenda} setPoll={setAgenda} />
    </Form>
  );
}
