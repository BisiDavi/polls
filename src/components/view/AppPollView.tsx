import ForgeUI, { Fragment } from "@forge/ui";

import PollTable from "../Table/PollTable";

export default function AppPollView({ appPoll, setModal }) {
  return (
    <Fragment>
      <PollTable setModal={setModal} />
    </Fragment>
  );
}
