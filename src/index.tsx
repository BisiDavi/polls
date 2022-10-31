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
      <Text>
        <Strong>Welcome to Workspace Meeting & Poll</Strong>
      </Text>
      <Button
        text="Create New Meeting/Poll"
        icon="add"
        iconPosition="before"
        appearance="primary"
        onClick={() => setModal(true)}
      />
      {modal && <Modal setModal={setModal} setSavedPolls={null} />}
      <Tabs>
        <Tab label="View Meeting & Poll in this Page">
          <PollTable type="Page-Polls" modal={modal} />
        </Tab>
        <Tab label="View Meeting & Poll in this Space">
          <PollTable type="Space-Polls" modal={modal} />
        </Tab>
        <Tab label="View All Meeting & Poll">
          <PollTable type="Polls" modal={modal} />
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
