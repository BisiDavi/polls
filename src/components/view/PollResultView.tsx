import ForgeUI, {
  Text,
  Fragment,
  Heading,
  Link,
  Button,
  Strong,
  User,
  DateLozenge,
  Em,
  useProductContext,
} from "@forge/ui";
import { v4 as uuidv4 } from "uuid";

import usePublish from "../../hooks/usePublish";
import { formatDate } from "../../lib/isDateValid";
import { formatPollTopic } from "../../lib/getAgendaName";
import PollList from "../poll/PollList";

export default function PollResultView({
  data,
  setAppPoll,
  setModal,
  setSavedPolls,
}) {
  const context = useProductContext();
  const { savePollData, getSavedPolls } = usePublish();

  const polls = [];

  const pollType = data.type === "meetingPoll" ? "Meeting" : "Regular";
  const formatPollType = data.type === "meetingPoll" ? "agenda" : "poll";
  const optionText =
    data.type === "meetingPoll" ? "Agendas to be discussed" : "Poll Options";

  const topics = data ? formatPollTopic(data, formatPollType) : null;

  async function publishDataHandler() {
    const pollData = {
      ...data,
      accountId: context.accountId,
    };
    const stringifyPollData = JSON.stringify(pollData);
    savePollData(`Polls--${uuidv4()}`, stringifyPollData);
    setAppPoll(stringifyPollData);
    setModal(false);

    await getSavedPolls().then((response) => {
      let pollData = {};
      response.results.map((item: any) => {
        pollData = {
          value: JSON.parse(item?.value),
          key: item.key,
        };
        polls.push(pollData);
      });
      setSavedPolls(polls);
    });
  }

  const meetingDate = data?.meetingDate ? formatDate(data?.meetingDate) : null;

  return (
    <Fragment>
      <Heading size="medium">Polls Details ({pollType})</Heading>
      {data && (
        <Fragment>
          <Text>
            <Strong>Title: </Strong>
            {data.title}
          </Text>
          <Text>
            <Strong>Description: </Strong>
            {data.description}
          </Text>
          {data.type === "meetingPoll" && (
            <Text>
              <Strong>Time:</Strong>
              {data.time}
            </Text>
          )}
          {data?.duration && (
            <Text>
              <Strong>Duration: </Strong>
              {data.duration}
            </Text>
          )}
          {data?.link && (
            <Text>
              <Strong>Link: </Strong>
              <Link href={data?.link} openNewTab>
                {data?.link}
              </Link>
            </Text>
          )}
          {data?.meetingDate && (
            <Text>
              <Strong>Meeting Date: </Strong>
              <DateLozenge value={new Date(meetingDate).getTime()} />
            </Text>
          )}
          <Text>
            <Strong>{optionText}</Strong>
          </Text>
          <PollList pollData={topics} type="italics" />
          <Text>
            <Strong>Author: </Strong>
            <User accountId={context.accountId} />
          </Text>
        </Fragment>
      )}
      <Button
        text="Publish"
        icon="book"
        iconPosition="before"
        appearance="primary"
        onClick={publishDataHandler}
      />
    </Fragment>
  );
}
