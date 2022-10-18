import ForgeUI, { Fragment } from "@forge/ui";

import MeetingPollForm from "./MeetingPollForm";
import RegularPollForm from "./RegularPollForm";

export default function PollForm({ type, setPollType }) {
  return (
    <Fragment>
      {type === "Meeting" ? (
        <MeetingPollForm viewType={type} setPollType={setPollType} />
      ) : (
        <RegularPollForm viewType={type} setPollType={setPollType} />
      )}
    </Fragment>
  );
}
