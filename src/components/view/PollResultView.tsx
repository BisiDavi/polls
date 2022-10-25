import ForgeUI, {
  Text,
  Fragment,
  Heading,
  Link,
  Button,
  Strong,
  User,
  DateLozenge,
  useState,
  useEffect,
  Em,
} from "@forge/ui";
import { v4 as uuidv4 } from "uuid";

import useUser from "../../hooks/useUser";
import usePublish from "../../hooks/usePublish";
import { formatDate } from "../../lib/isDateValid";
import { formatPollTopic } from "../../lib/getAgendaName";

export default function PollResultView({ data, setAppPoll, setModal }) {
  const [userDetails, setUserDetails] = useState(null);
  const [savedPolls, setSavedPolls] = useState(null);
  const { getUserDetails } = useUser();
  const { savePollData, getSavedPolls } = usePublish();

  useEffect(async () => {
    if (savedPolls === null) {
      await getSavedPolls().then((response) => {
        console.log("savedpolls-response,", response);
        setSavedPolls(response.results);
      });
    }
  }, []);

  const pollType = data.type === "meetingPoll" ? "Meeting" : "Regular";
  const formatPollType = data.type === "meetingPoll" ? "topic" : "poll";  
  const optionText =
    data.type === "meetingPoll" ? "Topics to be discussed" : "Poll Options";

  const topics = data ? formatPollTopic(data, formatPollType) : null;

  function publishDataHandler() {
    const pollData = {
      ...data,
      userDetails,
    };
    const stringifyPollData = JSON.stringify(pollData);
    const pollKey = savedPolls !== null ? savedPolls.length + 1 : null;
    savePollData(`Polls-${pollKey}-${uuidv4()}`, stringifyPollData);
    setAppPoll(stringifyPollData);
    setModal(false);
  }

  useEffect(async () => {
    if (userDetails === null) {
      await getUserDetails().then((response) => {
        setUserDetails(response);
      });
    }
  }, [userDetails]);

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
          {topics &&
            topics?.map((item, index) => (
              <Text key={item}>
                {index + 1}. <Em>{item}</Em>
              </Text>
            ))}
          {userDetails !== null && (
            <Text>
              <Strong>Author: </Strong>
              <User accountId={userDetails.accountId} />
            </Text>
          )}
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