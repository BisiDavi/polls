import { formatFormPoll } from "@/lib/getAgendaName";
import ForgeUI, { Fragment, Text, Em, Button, useState, Form } from "@forge/ui";
import PollsFieldSet from "../form/PollsFieldSet";

export default function MeetingPollItem({ pollOptions }) {
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
        <Em>Add Suggestion to agenda to be discussed in this Meeting </Em>
      </Text>
      <Form onSubmit={onSubmit}>
        <PollsFieldSet type="meeting" poll={agenda} setPoll={setAgenda} />
      </Form>
    </Fragment>
  );
}
