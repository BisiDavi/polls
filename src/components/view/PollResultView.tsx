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
  ButtonSet,
} from "@forge/ui";

import { formatPollTopic } from "../../lib/getAgendaName";
import useUser from "../../hooks/useUser";
import { formatDate } from "@/lib/isDateValid";

export default function PollResultView({ data }) {
  const [userDetails, setUserDetails] = useState(null);
  const { getUserDetails } = useUser();
  const pollType = data.type === "meetingPoll" ? "Meeting" : "Regular";

  const topics = data ? formatPollTopic(data) : null;

  useEffect(() => {
    if (userDetails === null) {
      getUserDetails().then((response) => {
        console.log("response", response);
        setUserDetails(response);
      });
    }
  }, [userDetails]);

  const meetingDate = data?.meetingDate ? formatDate(data?.meetingDate) : null;

  console.log("topics", topics);
  console.log("userDetails", userDetails);
  console.log("meetingFormData-pols", data);

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
        <Text key={item}>{item}</Text>
      ))}
      <ButtonSet>
        <Button
          text="Publish"
          icon="book"
          iconPosition="before"
          appearance="primary"
          onClick={() => null}
        />
        <Button
          text="Publish"
          icon="book"
          iconPosition="before"
          appearance="primary"
          onClick={() => null}
        />
      </ButtonSet>
    </Fragment>
  );
}
