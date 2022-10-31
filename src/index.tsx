import ForgeUI, { render, Fragment, Macro, useState } from "@forge/ui";

import Modal from "./components/modal";
import PollTable from "./components/table/PollTable";

const App = () => {
  const [savedPolls, setSavedPolls] = useState(null);
  const [modal, setModal] = useState(false);

  return (
    <Fragment>
      {modal && <Modal setModal={setModal} setSavedPolls={setSavedPolls} />}
      <PollTable
        setModal={setModal}
        savedPolls={savedPolls}
        setSavedPolls={setSavedPolls}
      />
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
