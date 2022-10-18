import ForgeUI, { Fragment } from "@forge/ui";

import MeetingPollForm from "./MeetingPollForm";
import RegularPollForm from "./RegularPollForm";

export default function PollForm({ type, setPollResult }) {
  return (
    <Fragment>
      {type === "Meeting" ? (
        <MeetingPollForm setPollResult={setPollResult} />
      ) : (
        <RegularPollForm setPollResult={setPollResult} />
      )}
    </Fragment>
  );
}
