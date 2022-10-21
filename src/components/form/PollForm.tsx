import ForgeUI, { Fragment } from "@forge/ui";

import MeetingPollForm from "./MeetingPollForm";
import RegularPollForm from "./RegularPollForm";

export default function PollForm({ type, appPoll, formType, setPollType }) {
  return (
    <Fragment>
      {type.includes("Meeting") ? (
        <MeetingPollForm
          appPoll={appPoll}
          viewType={formType}
          setPollType={setPollType}
        />
      ) : (
        type.includes("Regular") && (
          <RegularPollForm
            appPoll={appPoll}
            viewType={formType}
            setPollType={setPollType}
          />
        )
      )}
    </Fragment>
  );
}
