import ForgeUI, { Tabs, Tab } from "@forge/ui";

import MeetingPollView from "./MeetingPollView";
import RegularPollView from "./RegularPollView";

export default function TabView({ setPollType, setPollResult }) {
  return (
    <Tabs>
      <Tab label="Meeting Poll">
        <MeetingPollView setPollType={setPollType} />
      </Tab>
      <Tab label="Regular Poll">
        <RegularPollView setPollType={setPollType} />
      </Tab>
    </Tabs>
  );
}
