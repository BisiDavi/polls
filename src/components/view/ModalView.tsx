import ForgeUI, { useState, Button } from "@forge/ui";

import Layout from "../../layout";
import PollForm from "../form/PollForm";
import TabView from "./TabView";

export default function ModalView() {
  const [pollType, setPollType] = useState("");
  const [pollResult, setPollResult] = useState("");

  console.log("pollType", pollType);

  const backState =
    pollType !== "" && pollResult === "Meeting" ? pollResult : "";

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
        <TabView setPollType={setPollType} />
      ) : (
        <PollForm type={pollType} setPollResult={setPollResult} />
      )}
    </Layout>
  );
}
