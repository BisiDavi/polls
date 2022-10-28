import { useProductContext, useState } from "@forge/ui";
import { v4 as uuidv4 } from "uuid";

import usePublish from "../hooks/usePublish";
import { formatDate } from "../lib/isDateValid";
import { formatPollAgenda } from "../lib/getAgendaName";

export default function usePollResultView(
  setAppPoll,
  setSavedPolls,
  setModal,
  data
) {
  const context = useProductContext();
  const { savePollData, getSavedPolls } = usePublish();
  const [meetingLink, setMeetingLink] = useState(null);
  const [formState, setFormState] = useState(null);

  const polls = [];

  console.log("meetingLink", meetingLink);

  const meetingLinkResult = meetingLink
    ? meetingLink
    : formState
    ? formState?.link
    : null;

  console.log("formState-PollResultView", formState);
  console.log("meetingLinkResult", meetingLinkResult);

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

  const topics = data ? formatPollAgenda(data, formatPollType) : null;

  async function publishDataHandler() {
    const pollData = {
      ...data,
      ...meetingLinkData,
      accountId: context.accountId,
    };
    const stringifyPollData = JSON.stringify(pollData);
    savePollData(`Polls--${uuidv4()}`, stringifyPollData);
    setAppPoll(stringifyPollData);
    setModal(false);

    await getSavedPolls().then((response) => {
      let pollData = {};
      response.results.map((item: any) => {
        pollData = {
          value: JSON.parse(item?.value),
          key: item.key,
        };
        polls.push(pollData);
      });
      setSavedPolls(polls);
    });
  }

  const meetingDate = data?.meetingDate ? formatDate(data?.meetingDate) : null;
}
