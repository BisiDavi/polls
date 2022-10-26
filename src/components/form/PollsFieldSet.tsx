import ForgeUI, { TextField, Button, ButtonSet, Fragment } from "@forge/ui";

import { getAgendaName } from "../../lib/getAgendaName";

interface Props {
  type: "meeting" | "regular";
  setPoll: any;
  poll: string[];
  count?: number;
}

export default function PollsFieldSet({ type, poll, count, setPoll }: Props) {
  const pollText = type === "meeting" ? "Agenda" : "Poll Option";
  const buttonText = type === "meeting" ? "Meeting Agenda" : "Poll Option";
  const inputText =
    type === "meeting" ? "what's the meeting agenda" : "what's the poll option";

  function removeAgendaHandler() {
    if (poll.length > 1) {
      const pollTemp = poll;
      pollTemp.splice(pollTemp.length - 1, 1);
      setPoll([...pollTemp]);
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
          onClick={() => setPoll([...poll, `${pollText} ${poll.length + 1}`])}
        />
        {poll.length > 1 && (
          <Button
            icon="trash"
            text={`Remove ${buttonText}`}
            appearance="danger"
            iconPosition="before"
            onClick={removeAgendaHandler}
          />
        )}
      </ButtonSet>
      {poll.map((item, index) => {
        const pollIndex = count ? count : index;
        const { name, agendaCount } = getAgendaName(item, pollIndex);
        return (
          <TextField
            key={index}
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
