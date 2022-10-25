import { formatFormPoll } from "@/lib/getAgendaName";
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

export default function MeetingPollItem({ pollOptions, author }) {
  const [agenda, setAgenda] = useState(["Agenda 1"]);
  const [formState, setFormState] = useState(null);

  async function onSubmit(formData) {
    const agendaObj = formatFormPoll(agenda);
    console.log("formData", formData);
    setFormState({
      agendaObj,
    });
  }

  return (
    <Fragment>
      <Text>
        <Strong>Here is the Meeting Agenda, made by Author: </Strong>
        <User accountId={author} />
      </Text>
      <Text>
        <Em>
          Do you have any <Strong>agenda</Strong> to add to this Meeting{" "}
        </Em>
      </Text>
      {pollOptions.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
      <Form onSubmit={onSubmit}>
        <PollsFieldSet type="meeting" poll={agenda} setPoll={setAgenda} />
      </Form>
    </Fragment>
  );
}
