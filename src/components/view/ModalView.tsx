import ForgeUI, {
  Fragment,
  useState,
  ModalDialog,
  Tabs,
  Tab,
  Heading,
  Button,
} from "@forge/ui";

import MeetingView from "./MeetingPollView";
import RegularPollView from "./RegularPollView";
import MeetingPollForm from "./../form/MeetingPollForm";
import RegularPollForm from "./../form/RegularPollForm";

export default function ModalView() {
  const [isOpen, setOpen] = useState(true);
  const [pollType, setPollType] = useState("");

  const actionButtons = [
    <Button text="Back" icon="arrow-left" onClick={() => setPollType("")} />,
    <Button
      text="Cancel"
      icon="error"
      appearance="danger"
      onClick={() => setOpen(false)}
    />,
  ];

  return (
    <Fragment>
      {isOpen && (
        <ModalDialog header="Workspace Polls" onClose={() => setOpen(false)}>
          <Heading>Welcome to Polls, plan your meeting succintly.</Heading>
          {pollType === "" ? (
            <Tabs>
              <Tab label="Meeting Poll">
                <MeetingView setPollType={setPollType} />
              </Tab>
              <Tab label="Regular Poll">
                <RegularPollView setPollType={setPollType} />
              </Tab>
            </Tabs>
          ) : pollType === "Meeting" ? (
            <MeetingPollForm actionButton={actionButtons} />
          ) : (
            <RegularPollForm actionButton={actionButtons} />
          )}
        </ModalDialog>
      )}
    </Fragment>
  );
}
