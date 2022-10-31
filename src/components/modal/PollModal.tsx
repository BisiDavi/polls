import ForgeUI, { ModalDialog, Tab, Tabs, useState } from "@forge/ui";

import PollModalView from "../view/PollModalView";
import PollModalDetailsView from "../view/PollModalDetailsView";
import MeetingTab from "../tabs/MeetingTab";
import MeetingPoll from "../poll/MeetingPoll";
import { formatPollAgenda } from "../../lib/getAgendaName";

export default function PollModal({ setPollModal, data }) {
  const [suggestedAgenda, setSuggestedAgenda] = useState(["Suggest Agenda 1"]);
  const [saveAgendaStatus, setSaveAgendaStatus] = useState(false);

  const tab1Text =
    data.type === "meetingPoll" ? "Meeting Details" : "Poll Details";
  const tab2Text =
    data.type === "meetingPoll" ? "Suggest Meeting Agenda" : "Make Poll";

  const formatPollType = data.type === "meetingPoll" ? "agenda" : "poll";
  const pollOptions = data ? formatPollAgenda(data, formatPollType) : null;

  function modalHandler() {
    setPollModal(false);
  }

  return (
    <ModalDialog
      header="Welcome to Workspace Meeting & Polls, plan your meeting effectively and conduct polls."
      onClose={modalHandler}
    >
      <Tabs>
        <Tab label={tab1Text}>
          <PollModalDetailsView data={data} />
        </Tab>
        <Tab label={tab2Text}>
          <PollModalView data={data}>
            <MeetingPoll
              pollOptions={pollOptions}
              data={data}
              suggestedAgenda={suggestedAgenda}
              saveAgendaStatus={saveAgendaStatus}
              setSuggestedAgenda={setSuggestedAgenda}
              setSaveAgendaStatus={setSaveAgendaStatus}
            />
          </PollModalView>
        </Tab>
        {data.type === "meetingPoll" && (
          <Tab label="Suggested Agenda">
            <MeetingTab data={data} saveAgendastatus={saveAgendaStatus} />
          </Tab>
        )}
      </Tabs>
    </ModalDialog>
  );
}
