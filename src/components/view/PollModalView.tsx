import ForgeUI, { Fragment } from "@forge/ui";

import RegularPoll from "../poll/RegularPoll";
import { formatPollAgenda } from "../../lib/getAgendaName";

export default function PollModalView({ data, children }) {
  const formatPollType = data.type === "meetingPoll" ? "agenda" : "poll";
  const pollOptions = data ? formatPollAgenda(data, formatPollType) : null;

  return (
    <Fragment>
      {data.type === "regularMeetingPoll" ? (
        <RegularPoll pollOptions={pollOptions} data={data} />
      ) : (
        children
      )}
    </Fragment>
  );
}
