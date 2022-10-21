import ForgeUI, { Fragment } from "@forge/ui";

import PollTable from "../Table/PollTable";

export default function AppPollView({ appPoll, setModalState }) {
  return (
    <Fragment>
      <PollTable setModalState={setModalState} />
    </Fragment>
  );
}
