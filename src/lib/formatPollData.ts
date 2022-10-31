import { formatPollAgenda } from "./getAgendaName";

export default function formatPollData(data, suggestedAgenda) {
  const pollType = data.type === "meetingPoll" ? "Meeting" : "Poll";

  let suggestedAgendas = "";
  suggestedAgenda &&
    suggestedAgenda.map((item) => {
      const formatAgenda = formatPollAgenda(item, "suggest");
      suggestedAgendas += `-${formatAgenda[0]}\n`;
    });

  const suggestedAgendaString = `Suggested Agendas (From Team):\n${suggestedAgendas}`;

  const messageLink = data?.link
    ? typeof data.link === "string"
      ? `Meeting link:${data.link}`
      : `Start Url (Host):${data?.link?.start_url}\nJoin Url(Invite):${data?.link?.join_url}\nMeeting Password:${data?.link?.password}`
    : "";

  let agendaString = "";
  const formatPollType = data.type === "meetingPoll" ? "agenda" : "poll";
  const agendasArray = data ? formatPollAgenda(data, formatPollType) : null;
  agendasArray &&
    agendasArray.map((item) => {
      agendaString += `-${item}\n`;
    });

  const durationText = data.duration > 1 ? "hrs" : "hr";

  const duration =
    typeof data.duration === "number"
      ? `${data.duration} ${durationText}`
      : data.duration;

  return {
    duration,
    suggestedAgendaString,
    messageLink,
    pollType,
    agendaString,
  };
}
