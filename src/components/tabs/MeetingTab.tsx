import ForgeUI, { Fragment, Strong, Text } from "@forge/ui";

import { formatPollAgenda } from "../../lib/getAgendaName";
import PollList from "../poll/PollList";

export default function MeetingTab({ data }) {
  const agendas = data ? formatPollAgenda(data, "agenda") : null;

  return (
    <Fragment>
      <Text>
        <Strong>List of Agenda for the Meeting</Strong>
      </Text>
      <PollList pollData={agendas} />
    </Fragment>
  );
}
