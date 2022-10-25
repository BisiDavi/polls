import ForgeUI, {
  ModalDialog,
  Fragment,
  Text,
  Strong,
  Link,
  Em,
  DateLozenge,
  User,
  Tab,
  Tabs,
} from "@forge/ui";

import { formatDate } from "../../lib/isDateValid";
import { formatPollTopic } from "../../lib/getAgendaName";
import PollModalDetailsView from "../view/PollModalDetailsView";

export default function PollModal({ setPollModal, data }) {
  const meetingDate = data?.meetingDate ? formatDate(data?.meetingDate) : null;
  const optionText =
    data.type === "meetingPoll" ? "Topics to be discussed" : "Poll Options";
  const formatPollType = data.type === "meetingPoll" ? "topic" : "poll";
  const topics = data ? formatPollTopic(data, formatPollType) : null;

  function modalHandler() {
    setPollModal(false);
  }
  return (
    <ModalDialog
      header="Welcome to Polls, plan your meeting succintly."
      onClose={modalHandler}
    >
      <Tabs>
        <Tab label="Poll Detail">
          <PollModalDetailsView data={data} />
        </Tab>
        <Tab label="Make Poll">
          <PollModalDetailsView data={data} />
        </Tab>
      </Tabs>
    </ModalDialog>
  );
}
