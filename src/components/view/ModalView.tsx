import ForgeUI, {
  Fragment,
  useState,
  ModalDialog,
  Tabs,
  Tab,
  Heading,
  Button,
  useProductContext,
} from "@forge/ui";
import api, { route } from "@forge/api";

import MeetingView from "./MeetingPollView";
import RegularPollView from "./RegularPollView";
import MeetingPollForm from "./../form/MeetingPollForm";
import RegularPollForm from "./../form/RegularPollForm";

export default function ModalView() {
  const [isOpen, setOpen] = useState(true);
  const [pollType, setPollType] = useState("");
  const context = useProductContext();

  console.log("context", context);

  async function getUserDetails() {
    const response = await api
      .asApp()
      .requestConfluence(route`/wiki/rest/api/user/current`);

    const result = response.json();
    console.log("result ", result);
  }

  getUserDetails();

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
