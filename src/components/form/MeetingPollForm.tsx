import ForgeUI, {
  Heading,
  Form,
  useState,
  TextField,
  TextArea,
  DatePicker,
  Fragment,
  Button,
} from "@forge/ui";

import useMeetingPollForm from "../../hooks/useMeetingPollForm";
import PollResultView from "../view/PollResultView";
import PollsFieldSet from "./PollsFieldSet";

export default function MeetingPollForm({ viewType, setPollType }) {
  const [formState, setFormState] = useState(undefined);
  const { validDate, meetingPollData, onSubmit, agenda, setAgenda } =
    useMeetingPollForm(formState, setFormState, setPollType);

  return (
    <Fragment>
      {viewType === "Meeting-View" ? (
        <PollResultView data={meetingPollData} />
      ) : (
        <Form submitButtonAppearance="primary" onSubmit={onSubmit}>
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
          <TextField
            name="duration"
            label="Meeting Duration Estimate"
            placeholder="Allotted time for the meeting in (hr(s)/mins)?"
          />
          <TextArea label="Meeting Description" spellCheck name="description" />
          <PollsFieldSet type="meeting" poll={agenda} setPoll={setAgenda} />
        </Form>
      )}
    </Fragment>
  );
}
