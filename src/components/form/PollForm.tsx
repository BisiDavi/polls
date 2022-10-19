import ForgeUI, { Fragment } from "@forge/ui";

import MeetingPollForm from "./MeetingPollForm";
import RegularPollForm from "./RegularPollForm";

export default function PollForm({ type, formType, setPollType }) {
  return (
    <Fragment>
      {type === "Meeting" ? (
        <MeetingPollForm viewType={formType} setPollType={setPollType} />
      ) : (
        type === "Regular" && (
          <RegularPollForm viewType={formType} setPollType={setPollType} />
        )
      )}
    </Fragment>
  );
}
