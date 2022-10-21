import ForgeUI, { render, Fragment, Macro, useState } from "@forge/ui";

import AppPollView from "./components/view/AppPollView";
import Modal from "./components/modal";

const App = () => {
  const [appPoll, setAppPoll] = useState(null);
  const [modal, setModal] = useState(false);

  return (
    <Fragment>
      {modal && <Modal setAppPoll={setAppPoll} setModal={setModal} />}
      <AppPollView appPoll={appPoll} setModal={setModal} />
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
