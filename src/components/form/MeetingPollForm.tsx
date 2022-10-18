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
import { Fragment } from "react";

export default function MeetingPollForm({ actionButton }: any) {
  const [formState, setFormState] = useState(undefined);
  const [validDate, setValidDate] = useState(null);
  const [agenda, setAgenda] = useState(["Topic 1"]);
  const [pollFormData, setPollFormData] = useContentProperty(
    "pollFormData",
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
  };

  useEffect(() => {
    if (formState !== undefined) {
      const dateStatus = isDateValid(formState.meetingDate);
      setValidDate(dateStatus);
    }
  }, [formState]);

  useEffect(async () => {
    if (formState !== undefined && pollFormData.length === 0 && validDate) {
      await setPollFormData(formState);
    }
  }, [formState, pollFormData, validDate]);

  console.log("formState", formState);
  console.log("pollFormData", pollFormData);

  return (
    <Fragment>
   {   <Form
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
      </Form>}
    </Fragment>
  );
}
