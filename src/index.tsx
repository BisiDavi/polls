import ForgeUI, {
  render,
  Fragment,
  Macro,
  useState,
  useProductContext,
} from "@forge/ui";

import Modal from "./components/modal";
import PollTableTabs from "./components/tabs/PollTableTabs";

const App = () => {
  const [savedPolls, setSavedPolls] = useState(null);
  const [modal, setModal] = useState(false);
  const context = useProductContext();

  console.log("context", context);

  return (
    <Fragment>
      {modal && <Modal setModal={setModal} setSavedPolls={setSavedPolls} />}
      <PollTableTabs
        savedPolls={savedPolls}
        setModal={setModal}
        setSavedPolls={setSavedPolls}
      />
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
