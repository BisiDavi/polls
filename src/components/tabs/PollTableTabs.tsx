import ForgeUI, { Tab, Tabs } from "@forge/ui";

import PollTable from "../table/PollTable";

export default function PollTableTabs({ savedPolls, setModal, setSavedPolls }) {
  return (
    <Tabs>
      <Tab label="View Data in Page">
        <PollTable
          type="Page-Polls"
          setModal={setModal}
          savedPolls={savedPolls}
          setSavedPolls={setSavedPolls}
        />
      </Tab>
      <Tab label="View Data in Space">
        <PollTable
          type="Space-Polls"
          setModal={setModal}
          savedPolls={savedPolls}
          setSavedPolls={setSavedPolls}
        />
      </Tab>
    </Tabs>
  );
}
