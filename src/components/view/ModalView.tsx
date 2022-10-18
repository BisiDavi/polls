import ForgeUI, { useState, Button } from "@forge/ui";

import Layout from "../../layout";
import PollForm from "../form/PollForm";
import TabView from "./TabView";

export default function ModalView() {
  const [pollType, setPollType] = useState("");

  console.log("pollType", pollType);

  return (
    <Layout
      type={pollType}
      goBack={
        <Button text="Back" icon="arrow-left" onClick={() => setPollType("")} />
      }
    >
      {pollType === "" ? (
        <TabView setPollType={setPollType} />
      ) : (
        <PollForm type={pollType} />
      )}
    </Layout>
  );
}
