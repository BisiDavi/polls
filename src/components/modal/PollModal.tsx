import ForgeUI, { ModalDialog, Tab, Tabs, useProductContext } from "@forge/ui";

import MakePollModalView from "../view/MakePollModalView";
import useUser from "../../hooks/useUser";

import PollModalDetailsView from "../view/PollModalDetailsView";

export default function PollModal({ setPollModal, data }) {
  const { context } = useUser();

  console.log("context", context);

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
