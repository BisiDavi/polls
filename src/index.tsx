import ForgeUI, { Fragment, Macro, render, Tab, Tabs } from "@forge/ui";

import PollTabView from "./components/view/PollTabView";

const App = () => {
  return (
    <Fragment>
      <Tabs>
        <Tab label="View Meeting & Poll in this Page">
          <PollTabView type="Page-Polls" />
        </Tab>
        <Tab label="View Meeting & Poll in this Space">
          <PollTabView type="Space-Polls" />
        </Tab>
        <Tab label="View All Meeting & Poll">
          <PollTabView type="Polls" />
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
