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

import useUser from "../../hooks/useUser";
import usePublish from "../../hooks/usePublish";
import { formatDate } from "../../lib/isDateValid";
import { formatPollTopic } from "../../lib/getAgendaName";
import toSlug from "../../lib/toSlug";

export default function PollResultView({ data }) {
  const [userDetails, setUserDetails] = useState(null);
  const { getUserDetails } = useUser();
  const { savePollData } = usePublish();

  const pollType = data.type === "meetingPoll" ? "Meeting" : "Regular";
  const formatPollType = data.type === "meetingPoll" ? "topic" : "poll";
  const optionText =
    data.type === "meetingPoll" ? "Topics to be discussed" : "Poll Options";

  const topics = data ? formatPollTopic(data, formatPollType) : null;

  function publishDataHandler() {
    const titleSlug = toSlug(data.title);
    const pollData = { ...data, userDetails };
    savePollData(titleSlug, pollData);
  }

  useEffect(async () => {
    if (userDetails === null) {
      await getUserDetails().then((response) => {
        console.log("response", response);
        setUserDetails(response);
      });
    }
  }, [userDetails]);

  const meetingDate = data?.meetingDate ? formatDate(data?.meetingDate) : null;

  console.log("meetingFormData-polls", data);

  return (
    <Fragment>
      <Heading size="medium">Polls Details ({pollType})</Heading>
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
          <Link href={data?.link}>{data?.link}</Link>
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
      {topics.map((item, index) => (
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
      <Button
        text="Publish"
        icon="book"
        iconPosition="before"
        appearance="primary"
        onClick={() => null}
      />
    </Fragment>
  );
}
