import ForgeUI, { ModalDialog, Tab, Tabs } from "@forge/ui";
import MakePollModalView from "../view/MakePollModalView";

import PollModalDetailsView from "../view/PollModalDetailsView";

export default function PollModal({ setPollModal, data }) {
  function modalHandler() {
    setPollModal(false);
  }
  return (
    <ModalDialog
      header="Welcome to Polls, plan your meeting succintly."
      onClose={modalHandler}
    >
      <Tabs>
        <Tab label="Poll Detail">
          <PollModalDetailsView data={data} />
        </Tab>
        <Tab label="Make Poll">
          <MakePollModalView data={data} />
        </Tab>
      </Tabs>
    </ModalDialog>
  );
}