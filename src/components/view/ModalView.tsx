import ForgeUI, { useState, Button } from "@forge/ui";

import Layout from "../../layout";
import PollForm from "../form/PollForm";
import TabView from "./TabView";

export default function ModalView() {
  const [pollType, setPollType] = useState("");

  const backState =
    pollType === "Meeting-View"
      ? "Meeting"
      : pollType === "Meeting"
      ? ""
      : pollType === "Regular-View"
      ? "Regular"
      : pollType === "Regular"
      ? ""
      : "";

  console.log("backState", backState);
  console.log("pollType", pollType);

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
