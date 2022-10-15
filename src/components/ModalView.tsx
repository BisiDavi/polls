import ForgeUI, {
  Text,
  Fragment,
  useState,
  ModalDialog,
  Tabs,
  Tab,
  Heading,
  Button,
} from "@forge/ui";

import MeetingPollForm from "./form/MeetingPollForm";
import RegularPollForm from "./form/RegularPollForm";
import MeetingView from "./MeetingPollView";
import RegularPollView from "./RegularPollView";

export default function ModalView() {
  const [isOpen, setOpen] = useState(true);
  const [pollType, setPollType] = useState("");
  //   const [showPollView, setPollView] = useState(false);
  console.log("pollType", pollType);

  return (
    <Fragment>
      {isOpen && (
        <ModalDialog header="Workspace Polls" onClose={() => setOpen(false)}>
          <Heading>Welcome to Polls, plan your meeting succintly.</Heading>
          {pollType === "" ? (
            <Tabs>
              <Button
                text="back"
                icon="arrow-left"
                appearance="danger"
                onClick={() => setPollType("")}
              />
              <Tab label="Meeting Poll">
                <MeetingView setPollType={setPollType} />
              </Tab>
              <Tab label="Regular Poll">
                <RegularPollView setPollType={setPollType} />
              </Tab>
            </Tabs>
          ) : pollType === "Meeting" ? (
            <MeetingPollForm />
          ) : (
            <RegularPollForm />
          )}
          {/* <Tooltip text="Create New Poll">
            <Button icon="add" text="" onClick={() => setPollView(true)} />
          </Tooltip> */}
        </ModalDialog>
      )}
    </Fragment>
  );
}
