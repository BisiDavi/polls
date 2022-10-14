import ForgeUI, { ModalDialog } from "@forge/ui";
import PollTitle from "./PollTitle";

export default function PollsView({ pollView, setPollView }) {
  return (
    <ModalDialog header="Insert Polls Macro" onClose={() => setPollView(false)}>
      <PollTitle />
    </ModalDialog>
  );
}
