import ForgeUI, {
  useState,
  TextField,
  Button,
  ButtonSet,
  Fragment,
} from "@forge/ui";

interface Props {
  type: "meeting" | "regular";
}

function formatFormPoll(pollState) {
  const agendaObj = {};
  pollState.map((item, index) => {
    const { name } = getAgendaName(item, index);
    agendaObj[name] = "";
  });
}

export default function PollsFieldSet({ type }: Props) {
  const pollType = type === "meeting" ? "Agenda 1" : "Poll Option 1";
  const pollText = type === "meeting" ? "Agenda" : "Poll Option";
  const buttonText = type === "meeting" ? "Meeting Agenda" : "Poll Option";
  const inputText =
    type === "meeting" ? "what's the meeting agenda" : "what's the poll option";
  const [agenda, setAgenda] = useState([pollType]);

  console.log("agenda", agenda);

  function getAgendaName(item: string, index: number) {
    const agendaCount = index + 1;
    const itemSplit = item.split(" ")[0].toLowerCase();
    const name = `${itemSplit}-${agendaCount}`;
    return { agendaCount, name };
  }

  function removeAgendaHandler() {
    if (agenda.length > 1) {
      const agendaTemp = agenda;
      agendaTemp.splice(agendaTemp.length - 1, 1);
      setAgenda([...agendaTemp]);
    }
  }

  return (
    <Fragment>
      <ButtonSet>
        <Button
          icon="add"
          text={`Add ${buttonText}`}
          appearance="primary"
          iconPosition="before"
          onClick={() =>
            setAgenda([...agenda, `${pollText} ${agenda.length + 1}`])
          }
        />
        <Button
          icon="trash"
          text={`Remove ${buttonText}`}
          appearance="danger"
          iconPosition="before"
          onClick={removeAgendaHandler}
        />
      </ButtonSet>
      {agenda.map((item, index) => {
        const { name, agendaCount } = getAgendaName(item, index);
        return (
          <TextField
            name={name}
            label={item}
            placeholder={`${inputText} ${agendaCount}`}
            isRequired
          />
        );
      })}
    </Fragment>
  );
}
