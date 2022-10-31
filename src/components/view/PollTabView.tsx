import ForgeUI, { Fragment, useState } from "@forge/ui";

import Modal from "../modal";
import PollTable from "../table/PollTable";

export default function PollTabView({ type }) {
  const [savedPolls, setSavedPolls] = useState(null);
  const [modal, setModal] = useState(false);

  return (
    <Fragment>
      {modal && <Modal setModal={setModal} setSavedPolls={setSavedPolls} />}
      <PollTable
        type={type}
        setModal={setModal}
        savedPolls={savedPolls}
        setSavedPolls={setSavedPolls}
      />
    </Fragment>
  );
}
