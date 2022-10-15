import ForgeUI, { render, Fragment } from "@forge/ui";

import ModalView from "./components/ModalView";

const App = () => {
  return (
    <Fragment>
      <ModalView />
    </Fragment>
  );
};

export const run = render(<App />);
