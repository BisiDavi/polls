import ForgeUI, { useState, useEffect, Button } from "@forge/ui";

import Layout from "../../layout";
import PollForm from "../form/PollForm";
import TabView from "./TabView";

export default function ModalView() {
  const [pollType, setPollType] = useState("");
  const [backState, setBackState] = useState("");
  const [resultView, setResultView] = useState("");

  const backStateType = (pollStateType: string) =>
    pollStateType === "Meeting-View"
      ? "Meeting"
      : pollStateType === "Meeting"
      ? ""
      : pollStateType === "Regular-View"
      ? "Regular"
      : pollStateType === "Regular"
      ? ""
      : "";

  useEffect(() => {
    const backStateValue = backStateType(pollType);
    setBackState(backStateValue);
  }, [pollType]);

  useEffect(() => {
    const resultState =
      pollType === "Meeting-View"
        ? "Meeting-View"
        : pollType === "Regular-View"
        ? "Regular-View"
        : "";

    setResultView(resultState);
  }, [pollType]);

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
        <PollForm
          type={pollType}
          formType={resultView}
          setPollType={setPollType}
        />
      )}
    </Layout>
  );
}
