import ForgeUI, { Fragment, Heading } from "@forge/ui";

import MeetingPollItem from "../poll/MeetingPollItem";
import RegularPollItem from "../poll/RegularPollItem";
import { formatPollTopic } from "../../lib/getAgendaName";

export default function MakePollModalView({ data }) {
  const formatPollType = data.type === "meetingPoll" ? "topic" : "poll";
  const pollOptions = data ? formatPollTopic(data, formatPollType) : null;

  console.log("data.type", data.type);

  return (
    <Fragment>
      <Heading>{data.title}</Heading>

      {data.type === "regularMeetingPoll" ? (
        <RegularPollItem pollOptions={pollOptions} />
      ) : (
        <MeetingPollItem
          pollOptions={pollOptions}
          author={data?.userDetails?.accountId}
        />
      )}
    </Fragment>
  );
}
