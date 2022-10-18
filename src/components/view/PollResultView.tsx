import useUser from "@/hooks/useUser";
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
} from "@forge/ui";

import { formatPollTopic } from "../../lib/getAgendaName";

export default function PollResultView({ data }) {
  const [userDetails, setUserDetails] = useState(null);
  console.log("meetingFormData-polls", data);
  const { getUserDetails } = useUser();
  const pollType = data.type === "meetingPoll" ? "Meeting" : "Regular";

  const topics = data ? formatPollTopic(data) : null;

  useEffect(() => {
    if (userDetails === null) {
      getUserDetails().then((response) => {
        setUserDetails(response);
      });
    }
  }, [userDetails]);

  console.log("topics", topics);
  console.log("userDetails", userDetails);

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
          <DateLozenge value={new Date(`${data?.meetingDate}`).getTime()} />
        </Text>
      )}
      <Text>
        <Strong>Topics to be discussed</Strong>
      </Text>
      {topics.map((item) => (
        <Text key={item}>{item}</Text>
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
