import { useProductContext, useState } from "@forge/ui";
import { v4 as uuidv4 } from "uuid";
import { fetch } from "@forge/api";

import usePublish from "../hooks/usePublish";
import { formatDate } from "../lib/isDateValid";
import { formatPollAgenda } from "../lib/getAgendaName";
import formatPollData from "../lib/formatPollData";

export default function usePollResultView(setModal, data) {
  const context = useProductContext();
  const { savePollData, getSavedPolls } = usePublish();
  const [meetingLink, setMeetingLink] = useState(null);
  const [formState, setFormState] = useState(null);
  const [notifyTeam, setNotifyTeam] = useState(false);

  const polls = [];

  const { duration, messageLink, agendaString } = formatPollData(data, null);

  const meetingLinkResult = meetingLink
    ? meetingLink
    : formState
    ? formState?.link
    : null;

  const meetingLinkData = meetingLink
    ? {
        link: {
          id: meetingLink.id,
          start_url: meetingLink.start_url,
          join_url: meetingLink.join_url,
          password: meetingLink.password,
          createdAt: meetingLink.created_at,
        },
      }
    : { link: formState?.link };

  const pollType = data.type === "meetingPoll" ? "Meeting" : "Regular";
  const formatPollType = data.type === "meetingPoll" ? "agenda" : "poll";
  const optionText =
    data.type === "meetingPoll" ? "Agendas to be discussed" : "Poll Options";
  const meetingType = data.type === "meetingPoll" ? "meeting" : "poll";

  const topics = data ? formatPollAgenda(data, formatPollType) : null;

  async function notifyTeamHandler() {
    const meetingData = `Title:${data.title}\nDescription:${data.description}\nTime:${data?.time}\nDuration:${duration}\nMeeting Date:${data?.meetingDate}\n${messageLink}\n\nAgendas to be discussed:\n${agendaString}\nWe look forward to seeing you suggesting agenda for this meeting on confluence`;
    const pollData = `Title:${data.title}\nDescription:${data.description}\nDuration:${duration}\n${messageLink}\nPoll Options:\n${agendaString}\nWe look forward to seeing you participate on this poll from confluence`;
    const message = data.type === "meetingPoll" ? meetingData : pollData;

    await fetch("https://confluence-api.vercel.app/api/gmail/mail/send", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        receipent: data.team,
        message,
        type: meetingType,
      }),
    }).then(() => setNotifyTeam(true));
  }

  async function publishDataHandler() {
    const pollData = {
      ...data,
      ...meetingLinkData,
      accountId: context.accountId,
    };
    const stringifyPollData = JSON.stringify(pollData);
    savePollData(
      `Page-Polls-${context.contentId}-${uuidv4()}`,
      stringifyPollData
    );

    await notifyTeamHandler();
    await getSavedPolls().then((response) => {
      let pollData = {};
      response.results.map((item: any) => {
        pollData = {
          value: JSON.parse(item?.value),
          key: item.key,
        };
        polls.push(pollData);
      });
      setModal(false);
    });
  }

  const meetingDate = data?.meetingDate ? formatDate(data?.meetingDate) : null;

  return {
    notifyTeam,
    meetingDate,
    publishDataHandler,
    topics,
    pollType,
    optionText,
    setMeetingLink,
    setFormState,
    meetingLinkResult,
    notifyTeamHandler,
  };
}
