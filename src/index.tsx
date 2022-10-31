import ForgeUI, {
  Button,
  Fragment,
  Macro,
  render,
  Strong,
  Tab,
  Tabs,
  Text,
  useState,
} from "@forge/ui";
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
      {modal && <Modal setModal={setModal}  />}
      <Tabs>
        <Tab label="View Meeting & Poll in this Page">
          <PollTable type="Page-Polls" modal={modal} />
        </Tab>
        <Tab label="View Meeting & Poll in this Space">
          <PollTable type="Space-Polls" modal={modal} />
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
