import ForgeUI, { useState, Button } from "@forge/ui";

import Layout from "../../layout";
import PollForm from "../form/PollForm";
import TabView from "./TabView";

export default function ModalView() {
  const [pollType, setPollType] = useState("");
  const [pollResult, setPollResult] = useState("");

  const backState =
    pollType !== "" && pollResult === pollType ? pollResult : "";
  const vr =
    pollType === ""
      ? ""
      : pollResult.includes("Meeting")
      ? "Meeting"
      : pollResult.includes("Regular")
      ? "Regular"
      : "";
      
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
        <TabView setPollType={setPollType} setPollResult={setPollResult} />
      ) : (
        <PollForm type={pollType} setPollResult={setPollResult} />
      )}
    </Layout>
  );
}
