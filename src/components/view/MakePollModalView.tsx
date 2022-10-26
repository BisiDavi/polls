import ForgeUI, { Fragment } from "@forge/ui";

import MeetingPoll from "../poll/MeetingPoll";
import RegularPoll from "../poll/RegularPoll";
import { formatPollTopic } from "../../lib/getAgendaName";

export default function MakePollModalView({ data, user }) {
  const formatPollType = data.type === "meetingPoll" ? "agenda" : "poll";
  const pollOptions = data ? formatPollTopic(data, formatPollType) : null;

  return (
    <Fragment>
      {data.type === "regularMeetingPoll" ? (
        <RegularPoll pollOptions={pollOptions} user={user} title={data.title} />
      ) : (
        <MeetingPoll
          pollOptions={pollOptions}
          currentUser={user}
          title={data.title}
        />
      )}
    </Fragment>
  );
}
