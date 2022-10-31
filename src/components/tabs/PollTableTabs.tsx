import ForgeUI, { Tab, Tabs } from "@forge/ui";

import PollTabView from "../view/PollTabView";

export default function PollTableTabs() {
  return (
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
  );
}
