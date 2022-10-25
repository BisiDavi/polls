import ForgeUI, {
  Fragment,
  Text,
  Em,
  useState,
  Form,
  Strong,
  User,
} from "@forge/ui";

import PollsFieldSet from "../form/PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";

export default function MeetingPollItem({ pollOptions, author, currentUser }) {
  const [agenda, setAgenda] = useState(["Agenda 1"]);
  const [formState, setFormState] = useState(null);

  async function onSubmit(formData) {
    const agendaObj = formatFormPoll(agenda);
    console.log("formData", formData);
    setFormState({
      agendaObj,
    });
  }

  console.log("formState", formState);

  return (
    <Fragment>
      <Text>
        <Strong>Here is the Meeting Agenda, made by Author: </Strong>
        <User accountId={author} />
      </Text>
      {pollOptions.map((item, index) => (
        <Text key={index}>
          {index + 1}. {item}
        </Text>
      ))}
      <Text>
        <Em>
          Do you have any <Strong>agenda</Strong> to add to this Meeting?
        </Em>
      </Text>
      <Form onSubmit={onSubmit} submitButtonText="Submit Agenda">
        <PollsFieldSet type="meeting" poll={agenda} setPoll={setAgenda} />
      </Form>
    </Fragment>
  );
}
