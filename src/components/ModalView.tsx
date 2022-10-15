import ForgeUI, {
  Text,
  Fragment,
  useState,
  ModalDialog,
  Tabs,
  Tab,
} from "@forge/ui";
import MeetingView from "./MeetingPollView";
import RegularPollView from "./RegularPollView";

export default function ModalView() {
  const [isOpen, setOpen] = useState(true);
  //   const [showPollView, setPollView] = useState(false);

  return (
    <Fragment>
      {isOpen && (
        <ModalDialog header="Insert Polls Macro" onClose={() => setOpen(false)}>
          <Text>Welcome to Polls, plan your meeting succintly.</Text>
          <Tabs>
            <Tab label="Meeting Poll">
              <MeetingView />
            </Tab>
            <Tab label="Regular Poll">
              <RegularPollView />
            </Tab>
          </Tabs>
          {/* <Tooltip text="Create New Poll">
            <Button icon="add" text="" onClick={() => setPollView(true)} />
          </Tooltip> */}
        </ModalDialog>
      )}
    </Fragment>
  );
}
