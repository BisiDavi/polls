import ForgeUI, { Button, Fragment, Macro, render, useState } from "@forge/ui";

import Modal from "./components/modal";
import PollTable from "./components/table/PollTable";

const App = () => {
  const [modal, setModal] = useState(false);

  return (
    <Fragment>
      <Button
        text="Create New Meeting/Poll"
        icon="add"
        iconPosition="before"
        appearance="primary"
        onClick={() => setModal(true)}
      />
      {modal && <Modal setModal={setModal} />}
      <PollTable modal={modal} />
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
