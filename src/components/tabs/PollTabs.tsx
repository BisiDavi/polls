import ForgeUI, { Tabs, Tab } from "@forge/ui";

import MeetingPollView from "../view/MeetingPollView";
import RegularPollView from "../view/RegularPollView";

export default function PollTabs({ setPollType }) {
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
