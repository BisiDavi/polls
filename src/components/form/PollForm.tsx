import ForgeUI, { Fragment } from "@forge/ui";

import MeetingPollForm from "./MeetingPollForm";
import RegularPollForm from "./RegularPollForm";

export default function PollForm({ type, setPollResult }) {
  return (
    <Fragment>
      {type === "Meeting" ? (
        <MeetingPollForm viewType={type} setPollResult={setPollResult} />
      ) : (
        <RegularPollForm viewType={type} setPollResult={setPollResult} />
      )}
    </Fragment>
  );
}
