import { useEffect, useState } from "@forge/ui";
import { fetch } from "@forge/api";

import { formatPollAgenda } from "../lib/getAgendaName";

export default function useNotifyTeam(data, suggestedAgenda) {
  const [notify, setNotify] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState(undefined);

  const pollType = data.type === "meetingPoll" ? "Meeting" : "Poll";

  let suggestedAgendas = "";
  suggestedAgenda &&
    suggestedAgenda.map((item) => {
      const formatAgenda = formatPollAgenda(item, "suggest");
      suggestedAgendas += `-${formatAgenda[0]}\n`;
    });

  const suggestedAgendaString = `Suggested Agendas (From Team):\n${suggestedAgendas}`;

  const messageLink =
    typeof data.link === "string"
      ? `Meeting link:${data.link}`
      : `Start Url (Host):${data.link.start_url}\nJoin Url(Invite):${data.link.join_url}\nMeeting Password:${data.link.password}`;

  let agendaString = "";
  const formatPollType = data.type === "meetingPoll" ? "agenda" : "poll";
  const agendasArray = data ? formatPollAgenda(data, formatPollType) : null;
  agendasArray &&
    agendasArray.map((item) => {
      agendaString += `-${item}\n`;
    });

  const durationText = data.duration > 1 ? " hrs" : " hr";

  const duration =
    typeof data.duration === "number" ? durationText : data.duration;

  useEffect(async () => {
    if (formState !== undefined && !submitted) {
      const meetingData = `Title:${data.title}\nDescription:${data.description}\nTime:${data.time}\nDuration:${duration}\n${messageLink}\nMeeting Date:${data.meetingDate}\n\nAgendas to be discussed:\n${agendaString}${suggestedAgendaString}`;

      await fetch("https://confluence-api.vercel.app/api/gmail/mail/send", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          receipent: formState.teamEmail,
          message: meetingData,
        }),
      }).then(() => {
        setSubmitted(true);
        setNotify(false);
        setFormState(undefined);
      });
    }
  }, [formState]);

  function notifyHandler() {
    setNotify(true);
    setSubmitted(false);
  }

  async function onSubmit(formData) {
    formData: {
      teamEmail: "";
    }
    setFormState(formData);
  }

  return { onSubmit, notify, submitted, pollType, notifyHandler };
}
