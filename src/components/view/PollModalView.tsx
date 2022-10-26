import ForgeUI, { Fragment } from "@forge/ui";

import MeetingPoll from "../poll/MeetingPoll";
import RegularPoll from "../poll/RegularPoll";
import { formatPollAgenda } from "../../lib/getAgendaName";
import useUser from "@/hooks/useUser";

export default function PollModalView({ data, suggestedAgenda, setSuggestedAgenda }) {
  const formatPollType = data.type === "meetingPoll" ? "agenda" : "poll";
  const pollOptions = data ? formatPollAgenda(data, formatPollType) : null;
  const { context } = useUser();
  const user = context?.accountId;

  return (
    <Fragment>
      {data.type === "regularMeetingPoll" ? (
        <RegularPoll pollOptions={pollOptions} user={user} title={data.title} />
      ) : (
        <MeetingPoll
          pollOptions={pollOptions}
          currentUser={user}
          title={data.title}
          suggestedAgenda={suggestedAgenda}
          setSuggestedAgenda={setSuggestedAgenda}
        />
      )}
    </Fragment>
  );
}
