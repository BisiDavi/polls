import ForgeUI, { Fragment } from "@forge/ui";

import MeetingPollForm from "./MeetingPollForm";
import RegularPollForm from "./RegularPollForm";

export default function PollForm({ type }) {
  return (
    <Fragment>
      {type === "Meeting" ? <MeetingPollForm /> : <RegularPollForm />}
    </Fragment>
  );
}
