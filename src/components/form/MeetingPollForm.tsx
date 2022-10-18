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

import PollsFieldSet from "./PollsFieldSet";
import PollResultView from "../view/PollResultView";
import useMeetingPollForm from "../../hooks/useMeetingPollForm";

export default function MeetingPollForm() {
  const [formState, setFormState] = useState(undefined);
  const { validDate, meetingPollData, onSubmit, agenda, setAgenda } =
    useMeetingPollForm(formState, setFormState);

  console.log("formState", formState);
  console.log("meetingPollData", meetingPollData);

  return (
    <Fragment>
      {meetingPollData ? (
        <PollResultView data={meetingPollData} />
      ) : (
        <Form
          submitButtonAppearance="primary"
          // actionButtons={actionButton}
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
      )}
    </Fragment>
  );
}
