import { useEffect, useState } from "@forge/ui";
import { fetch } from "@forge/api";

import formatPollData from "../lib/formatPollData";

export default function useNotifyTeam(data, suggestedAgenda) {
  const [notify, setNotify] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState(undefined);

  const {
    duration,
    suggestedAgendaString,
    messageLink,
    pollType,
    agendaString,
  } = formatPollData(data, suggestedAgenda);

  useEffect(async () => {
    if (formState !== undefined && !submitted) {
      const meetingData = `Title:${data.title}\nDescription:${data.description}\nTime:${data?.time}\nDuration:${duration}\n${messageLink}\nMeeting Date:${data?.meetingDate}\n\nAgendas to be discussed:\n${agendaString}${suggestedAgendaString}`;
      const pollData = `Title:${data.title}\nDescription:${data.description}\nDuration:${duration}\n${messageLink}\n\nPolls Options:\n${agendaString}${suggestedAgendaString}`;

      await fetch("https://confluence-api.vercel.app/api/gmail/mail/send", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          receipent: formState.teamEmail,
          message: meetingData,
          type: "meeting",
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
