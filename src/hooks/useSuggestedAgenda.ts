import { useEffect, useState } from "@forge/ui";

import toSlug from "../lib/toSlug";
import useStorage from "../hooks/useStorage";
import { getSuggestedAgenda } from "../lib/formatMeeting";
import { formatPollAgenda } from "../lib/getAgendaName";

export default function useSuggestedAgenda(data, saveAgendastatus) {
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

  return { agendas, suggestedAgenda };
}
