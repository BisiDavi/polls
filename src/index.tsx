import ForgeUI, { render, Fragment, Macro } from "@forge/ui";

import ModalView from "./components/view/ModalView";

const App = () => {
  return (
    <Fragment>
      <ModalView />
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
