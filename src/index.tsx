import ForgeUI, { render, Fragment, Macro } from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

import AppPollView from "./components/view/AppPollView";
import ModalView from "./components/view/ModalView";

const App = () => {
  const [appPoll] = useContentProperty("appPoll", "");
  console.log("appPoll", appPoll);
  return (
    <Fragment>
      <ModalView />
      {appPoll && <AppPollView />}
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
