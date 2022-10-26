import ForgeUI, { ModalDialog, Tab, Tabs } from "@forge/ui";

import MakePollModalView from "../view/MakePollModalView";
import useUser from "../../hooks/useUser";

import PollModalDetailsView from "../view/PollModalDetailsView";

export default function PollModal({ setPollModal, data }) {
  const { context } = useUser();

  const user = context?.accountId;

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
          <MakePollModalView data={data} user={user} />
        </Tab>
        {data.type === "meetingPoll" && (
          <Tab label="Suggested Agenda">
             
          </Tab>
        )}
      </Tabs>
    </ModalDialog>
  );
}
