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

import { formatPollTopic } from "../../lib/getAgendaName";
import useUser from "../../hooks/useUser";
import { formatDate } from "../../lib/isDateValid";

export default function PollResultView({ data }) {
  const [userDetails, setUserDetails] = useState(null);
  const { getUserDetails } = useUser();
  const pollType = data.type === "meetingPoll" ? "Meeting" : "Regular";
  const formatPollType = data.type === "meetingPoll" ? "topic" : "poll";

  const topics = data ? formatPollTopic(data, formatPollType) : null;

  useEffect(async () => {
    if (userDetails === null) {
      await getUserDetails().then((response) => {
        console.log("response", response);
        setUserDetails(response);
      });
    }
  }, [userDetails]);

  const meetingDate = data?.meetingDate ? formatDate(data?.meetingDate) : null;

  console.log("userDetails", userDetails);
  console.log("meetingFormData-polls", data);

  return (
    <Fragment>
      <Heading size="medium">Polls Details ({pollType})</Heading>
      <Heading size="small">Title: {data.title}</Heading>
      <Text>
        <Strong>Description: </Strong>
        {data.description}
      </Text>
      {data?.link && (
        <Text>
          <Strong>Link: </Strong>
          <Link href={data?.link}>{data?.link}</Link>{" "}
        </Text>
      )}
      {data?.meetingDate && (
        <Text>
          <Strong>Meeting Date:</Strong>
          <DateLozenge value={new Date(meetingDate).getTime()} />
        </Text>
      )}
      <Text>
        <Strong>Topics to be discussed</Strong>
      </Text>
      {topics.map((item) => (
        <Text key={item}>
          <Em>{item}</Em>
        </Text>
      ))}
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
