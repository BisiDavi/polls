import ForgeUI, {
  Fragment,
  Strong,
  Text,
  useProductContext,
  User,
} from "@forge/ui";

import { formatPollAgenda } from "../../lib/getAgendaName";
import PollList from "../poll/PollList";
import { formatAgendaDate } from "../../lib/formatMeeting";
import NotifyTeam from "../view/NotifyTeam";
import useSuggestedAgenda from "../../hooks/useSuggestedAgenda";

export default function MeetingTab({ data, saveAgendastatus }) {
  const { agendas, suggestedAgenda } = useSuggestedAgenda(
    data,
    saveAgendastatus
  );
  const context = useProductContext();

  return (
    <Fragment>
      <Text>
        <Strong>List of Agenda for the Meeting</Strong>
      </Text>
      <PollList pollData={agendas} />
      {suggestedAgenda.length > 0 && (
        <Text>
          <Strong>Suggested Agenda</Strong>
        </Text>
      )}
      {suggestedAgenda.length > 0 &&
        suggestedAgenda.map((item) => {
          const date = formatAgendaDate(item.date);
          const formatAgenda = formatPollAgenda(item, "suggest");
          return (
            <Text key={item.date}>
              <Strong>-</Strong>
              {formatAgenda[0]}
              {`         `}
              <User accountId={item.author} />
              {`         `}({date})
            </Text>
          );
        })}
      {suggestedAgenda.length > 0 && context.accountId === data.accountId && (
        <NotifyTeam data={data} suggestedAgenda={suggestedAgenda} />
      )}
    </Fragment>
  );
}
