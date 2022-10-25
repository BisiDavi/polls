import { formatPollTopic } from "@/lib/getAgendaName";
import ForgeUI, { Fragment, Heading } from "@forge/ui";

import RegularPollItem from "../poll/RegularPollItem";

export default function MakePollModalView({ data }) {
  const formatPollType = data.type === "meetingPoll" ? "topic" : "poll";
  const pollOptions = data ? formatPollTopic(data, formatPollType) : null;

  return (
    <Fragment>
      <Heading>{data.title}</Heading>

      <RegularPollItem pollOptions={pollOptions} />
    </Fragment>
  );
}
