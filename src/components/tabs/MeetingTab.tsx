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

export default function MeetingTab({ data }) {
  const { getDataFromStorage } = useStorage();
  const [suggestedAgenda, setSuggestedAgenda] = useState([]);

  const dataKey = `Agenda-${toSlug(data.title)}`;

  useEffect(async () => {
    await getDataFromStorage("Agenda-").then((response) => {
      const agendas = getSuggestedAgenda(response.results, dataKey);
      setSuggestedAgenda(agendas);
    });
  }, []);

  console.log("MeetingTab-suggestedAgenda", suggestedAgenda);

  const agendas = data ? formatPollAgenda(data, "agenda") : null;

  return (
    <Fragment>
      <Text>
        <Strong>List of Agenda for the Meeting</Strong>
      </Text>
      <PollList pollData={agendas} />
      <Text>
        <Strong>Suggested Agenda</Strong>
      </Text>
      {suggestedAgenda.length > 0 &&
        suggestedAgenda.map((item) => {
          console.log("item", item);
          const date = formatAgendaDate(item.date);
          const formatAgenda = formatPollAgenda(item, "suggest");
          return (
            <Text key={item.date}>
              <Strong>-</Strong>
              {formatAgenda[0]}
              <User accountId={item.author} />({date})
            </Text>
          );
        })}
    </Fragment>
  );
}
