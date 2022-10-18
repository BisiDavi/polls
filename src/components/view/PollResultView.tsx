import ForgeUI, {
  Text,
  Fragment,
  Heading,
  Link,
  Button,
  Strong,
} from "@forge/ui";

import { formatPollTopic } from "../../lib/getAgendaName";

export default function PollResultView({ data }) {
  console.log("meetingFormData-polls", data);
  const pollType = data.type === "meetingPoll" ? "Meeting" : "Regular";

  const topics = data ? formatPollTopic(data) : null;

  console.log("topics", topics);

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
          <Strong>{data?.meetingDate}</Strong>
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
        onClick={() => null}
      />
    </Fragment>
  );
}
