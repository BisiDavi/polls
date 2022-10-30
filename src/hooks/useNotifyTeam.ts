import { useEffect, useState } from "@forge/ui";
import { fetch } from "@forge/api";

import { formatPollAgenda } from "../lib/getAgendaName";

export default function useNotifyTeam(data) {
  const [notify, setNotify] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState(undefined);

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

  const pollType = data.type === "meetingPoll" ? "Meeting" : "Poll";

  useEffect(async () => {
    if (formState !== undefined && !submitted) {
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

      const meetingData = `Title:${data.title}\nDescription:${data.description}\nTime:${data.time}\nDuration:${duration}\n${messageLink}\nMeeting Date:${data.meetingDate}\n\nAgendas to be discussed:\n${agendaString}`;

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

  return { onSubmit, notify, submitted, pollType, notifyHandler };
}
