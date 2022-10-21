import ForgeUI, { render, Fragment, Macro, useState } from "@forge/ui";

import AppPollView from "./components/view/AppPollView";
import ModalView from "./components/view/ModalView";

const App = () => {
  const [appPoll, setAppPoll] = useState(null);
  const [modalState, setModalState] = useState(false);

  return (
    <Fragment>
      {appPoll ? (
        <AppPollView appPoll={appPoll} setModalState={setModalState} />
      ) : (
        <ModalView setAppPoll={setAppPoll} />
      )}
      <AppPollView appPoll={appPoll} setModalState={setModalState} />
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
