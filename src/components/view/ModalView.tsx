import ForgeUI, { useState, Button } from "@forge/ui";

import Layout from "../../layout";
import PollForm from "../form/PollForm";
import TabView from "./TabView";

export default function ModalView() {
  const [pollType, setPollType] = useState("");
 
  const backState = pollType.includes("Meeting")
    ? "Meeting"
    : pollType.includes("Regular") && "Regular";

  console.log("backState", backState);

  return (
    <Layout
      type={pollType}
      goBack={
        <Button
          text="Back"
          icon="arrow-left"
          onClick={() => setPollType(backState)}
        />
      }
    >
      {pollType === "" ? (
        <TabView setPollType={setPollType} setPollResult={setPollType} />
      ) : (
        <PollForm type={pollType} setPollType={setPollType} />
      )}
    </Layout>
  );
}
