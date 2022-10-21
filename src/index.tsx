import ForgeUI, { render, Fragment, Macro, useState } from "@forge/ui";

import AppPollView from "./components/view/AppPollView";
import ModalView from "./components/view/ModalView";

const App = () => {
  const [appPoll, setAppPoll] = useState(null);

  return (
    <Fragment>
      {!appPoll && <ModalView appPoll={appPoll} />}
      {appPoll && <AppPollView appPoll={appPoll} />}
      <AppPollView appPoll={appPoll} />
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
