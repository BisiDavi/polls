import ForgeUI, { ModalDialog, Tab, Tabs, useState } from "@forge/ui";

import PollModalView from "../view/PollModalView";
import PollModalDetailsView from "../view/PollModalDetailsView";
import MeetingTab from "../tabs/MeetingTab";

export default function PollModal({ setPollModal, data }) {
  const [suggestedAgenda, setSuggestedAgenda] = useState([
    "Suggest Agenda 1",
  ]);

  console.log("suggestedAgenda", suggestedAgenda);

  const tab1Text =
    data.type === "meetingPoll" ? "Meeting Details" : "Poll Details";
  const tab2Text =
    data.type === "meetingPoll" ? "Suggest Meeting Agenda" : "Make Poll";

  function modalHandler() {
    setPollModal(false);
  }

  return (
    <ModalDialog
      header="Welcome to Polls, plan your meeting succintly."
      onClose={modalHandler}
    >
      <Tabs>
        <Tab label={tab1Text}>
          <PollModalDetailsView data={data} />
        </Tab>
        <Tab label={tab2Text}>
          <PollModalView
            data={data}
            suggestedAgenda={suggestedAgenda}
            setSuggestedAgenda={setSuggestedAgenda}
          />
        </Tab>
        {data.type === "meetingPoll" && (
          <Tab label="Suggested Agenda">
            <MeetingTab data={data} />
          </Tab>
        )}
      </Tabs>
    </ModalDialog>
  );
}
