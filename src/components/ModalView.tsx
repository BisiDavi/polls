import ForgeUI, {
  Text,
  Fragment,
  useState,
  ModalDialog,
  Tabs,
  Tab,
} from "@forge/ui";
import PollsView from "./PollsView";

export default function ModalView() {
  const [isOpen, setOpen] = useState(true);
  //   const [showPollView, setPollView] = useState(false);

  const pollsArray = ["Meeting Polls", "Regular Polls"];

  return (
    <Fragment>
      {isOpen && (
        <ModalDialog header="Insert Polls Macro" onClose={() => setOpen(false)}>
          <Text>Welcome to Polls, plan your meeting succintly.</Text>
          <Tabs>
            {pollsArray.map((item) => (
              <Tab label={item}>
                <PollsView label={item} />
              </Tab>
            ))}
          </Tabs>
          {/* <Tooltip text="Create New Poll">
            <Button icon="add" text="" onClick={() => setPollView(true)} />
          </Tooltip> */}
        </ModalDialog>
      )}
    </Fragment>
  );
}
