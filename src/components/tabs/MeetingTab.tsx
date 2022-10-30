import ForgeUI, {
  Fragment,
  Strong,
  Text,
  useEffect,
  User,
  useState,
} from "@forge/ui";

import { formatPollAgenda } from "../../lib/getAgendaName";
import PollList from "../poll/PollList";
import toSlug from "../../lib/toSlug";
import useStorage from "../../hooks/useStorage";
import { getSuggestedAgenda, formatAgendaDate } from "../../lib/formatMeeting";
import NotifyTeam from "../view/NotifyTeam";

export default function MeetingTab({ data, saveAgendastatus }) {
  const { getDataFromStorage } = useStorage();
  const [suggestedAgenda, setSuggestedAgenda] = useState([]);

  const dataKey = `Agenda-${toSlug(data.title)}`;

  useEffect(async () => {
    await getDataFromStorage("Agenda-").then((response) => {
      const agendas = getSuggestedAgenda(response.results, dataKey);
      setSuggestedAgenda(agendas);
    });
  }, [saveAgendastatus]);

  const agendas = data ? formatPollAgenda(data, "agenda") : null;

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
      {suggestedAgenda.length > 0 && <NotifyTeam data={data} />}
    </Fragment>
  );
}
