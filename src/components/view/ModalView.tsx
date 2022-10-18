import ForgeUI, { useState, Tabs, Tab } from "@forge/ui";

import MeetingView from "./MeetingPollView";
import RegularPollView from "./RegularPollView";
import Layout from "../../layout";
import PollForm from "../form/PollForm";

export default function ModalView() {
  const [pollType, setPollType] = useState("");

  return (
    <Layout form={<PollForm type={pollType} />}>
      <Tabs>
        <Tab label="Meeting Poll">
          <MeetingView setPollType={setPollType} />
        </Tab>
        <Tab label="Regular Poll">
          <RegularPollView setPollType={setPollType} />
        </Tab>
      </Tabs>
    </Layout>
  );
}
