import ForgeUI, { useState, useEffect, Button, ModalDialog } from "@forge/ui";

import PollView from "../view/PollView";
import TabView from "../tabs/PollTabs";

export default function Modal({ setModal }) {
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

  function modalHandler() {
    setModal(false);
  }

  return (
    <ModalDialog
      header="Welcome to Workspace Meeting & Polls, plan your meeting effectively and conduct polls."
      onClose={modalHandler}
      width="x-large"
    >
      {pollType === "" ? (
        <TabView setPollType={setPollType} />
      ) : (
        <PollView
          type={pollType}
          setPollType={setPollType}
          setModal={setModal}
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
