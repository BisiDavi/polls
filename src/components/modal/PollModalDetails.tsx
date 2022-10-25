import ForgeUI, {
  ModalDialog,
  Fragment,
  Text,
  Strong,
  Link,
  Em,
  DateLozenge,
  User,
} from "@forge/ui";

import { formatDate } from "../../lib/isDateValid";
import { formatPollTopic } from "../../lib/getAgendaName";

export default function PollModalDetails({ setPollModal, data }) {
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
      <Fragment>
        <Text>
          <Strong>Title: </Strong>
          {data.title}
        </Text>
        <Text>
          <Strong>Description: </Strong>
          {data.description}
        </Text>
        {data?.duration && (
          <Text>
            <Strong>Duration: </Strong>
            {data.duration}
          </Text>
        )}
        {data?.link && (
          <Text>
            <Strong>Link: </Strong>
            <Link href={data?.link} openNewTab>{data?.link}</Link>
          </Text>
        )}
        {data?.meetingDate && (
          <Text>
            <Strong>Meeting Date: </Strong>
            <DateLozenge value={new Date(meetingDate).getTime()} />
          </Text>
        )}
        {data.userDetails !== null && (
          <Text>
            <Strong>Author: </Strong>
            <User accountId={data.userDetails.accountId} />
          </Text>
        )}
        <Text>
          <Strong>{optionText}</Strong>
        </Text>
        {topics &&
          topics?.map((item, index) => (
            <Text key={item}>
              {index + 1}. <Em>{item}</Em>
            </Text>
          ))}
      </Fragment>
    </ModalDialog>
  );
}
