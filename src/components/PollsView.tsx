import ForgeUI, { Fragment } from "@forge/ui";

import RegularPollView from "./RegularPollView";
import MeetingView from "./RegularPollView";

interface Props {
  label: string;
}

export default function PollsView({ label }: Props) {
  console.log("label", label);
  return (
    <Fragment>
      {label == "Meeting Polls" ? <RegularPollView /> : <MeetingView />}
    </Fragment>
  );
}
