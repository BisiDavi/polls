import ForgeUI, { Fragment } from "@forge/ui";

import MeetingPoll from "../poll/MeetingPoll";
import RegularPoll from "../poll/RegularPoll";
import { formatPollAgenda } from "../../lib/getAgendaName";

export default function PollModalView({
  data,
  suggestedAgenda,
  setSuggestedAgenda,
}) {
  const formatPollType = data.type === "meetingPoll" ? "agenda" : "poll";
  const pollOptions = data ? formatPollAgenda(data, formatPollType) : null;

  return (
    <Fragment>
      {data.type === "regularMeetingPoll" ? (
        <RegularPoll pollOptions={pollOptions} title={data.title} />
      ) : (
        <MeetingPoll
          pollOptions={pollOptions}
          title={data.title}
          suggestedAgenda={suggestedAgenda}
          setSuggestedAgenda={setSuggestedAgenda}
        />
      )}
    </Fragment>
  );
}
