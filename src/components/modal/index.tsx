import ForgeUI, { useState, useEffect, Button, ModalDialog } from "@forge/ui";

import PollView from "../view/PollView";
import TabView from "../view/TabView";

export default function Modal({ setAppPoll, setModal }) {
  const [pollType, setPollType] = useState("");
  const [backState, setBackState] = useState("");

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

 

  console.log("polltype", pollType);
  console.log("backState", backState);

  function modalHandler() {
    setModal(false);
  }

  return (
    <ModalDialog
      header="Welcome to Polls, plan your meeting succintly."
      onClose={modalHandler}
    >
      {pollType === "" ? (
        <TabView setPollType={setPollType} />
      ) : (
        <PollView
          type={pollType}
          setPollType={setPollType}
          setAppPoll={setAppPoll}
        />
      )}
      {pollType !== "" && (
        <Button
          text="Back"
          icon="arrow-left"
          onClick={() => setPollType(backState)}
        />
      )}
    </ModalDialog>
  );
}
