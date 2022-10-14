import ForgeUI, {
  Text,
  Fragment,
  useState,
  Button,
  TextField,
  Form,
  Tooltip,
  ModalDialog,
} from "@forge/ui";
import PollsView from "./PollsView";

export default function ModalView() {
  const [isOpen, setOpen] = useState(true);
  const [showPollView, setPollView] = useState(false);

  return (
    <Fragment>
      {isOpen && (
        <ModalDialog header="Insert Polls Macro" onClose={() => setOpen(false)}>
          <Tooltip text="Create New Poll">
            <Button icon="add" text="" onClick={() => setPollView(true)} />
          </Tooltip>
          {showPollView && (
            <PollsView pollView={showPollView} setPollView={setPollView} />
          )}
        </ModalDialog>
      )}
    </Fragment>
  );
}
