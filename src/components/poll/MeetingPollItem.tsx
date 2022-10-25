import ForgeUI, {
  Fragment,
  Text,
  Em,
  useState,
  Form,
  Strong,
  Heading,
} from "@forge/ui";

import PollsFieldSet from "../form/PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";

export default function MeetingPollItem({ pollOptions, currentUser, title }) {
  const [agenda, setAgenda] = useState(["Agenda 1"]);
  const [formState, setFormState] = useState(null);

  const agendaText = pollOptions.length > 1 ? "Agendas" : "Agenda";

  async function onSubmit(formData) {
    const agendaObj = formatFormPoll(agenda);
    console.log("formData", formData);
    setFormState({
      ...agendaObj,
      ...formData,
    });
  }

  console.log("formState", formState);

  return (
    <Fragment>
      <Heading>
        {agendaText} to be discussed in the meeting "{title}":
      </Heading>
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
