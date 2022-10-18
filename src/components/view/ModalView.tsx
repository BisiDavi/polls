import ForgeUI, { useState, Tabs, Tab, Button } from "@forge/ui";

import Layout from "../../layout";
import PollForm from "../form/PollForm";
import MeetingView from "./MeetingPollView";
import RegularPollView from "./RegularPollView";

export default function ModalView() {
  const [pollType, setPollType] = useState("");

  return (
    <Layout
      goBack={
        <Button text="Back" icon="arrow-left" onClick={() => setPollType("")} />
      }
    >
      {pollType === "" ? (
        <Tabs>
          <Tab label="Meeting Poll">
            <MeetingView setPollType={setPollType} />
          </Tab>
          <Tab label="Regular Poll">
            <RegularPollView setPollType={setPollType} />
          </Tab>
        </Tabs>
      ) : (
        <PollForm type={pollType} />
      )}
    </Layout>
  );
}
