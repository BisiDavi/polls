import ForgeUI, { render, Fragment, Macro, useState } from "@forge/ui";

import Modal from "./components/modal";
import PollTable from "./components/Table/PollTable";

const App = () => {
  const [appPoll, setAppPoll] = useState(null);
  const [modal, setModal] = useState(false);

  console.log("appPoll,", appPoll);
 
  return (
    <Fragment>
      {modal && <Modal setAppPoll={setAppPoll} setModal={setModal} />}
      <PollTable setModal={setModal} />
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
 