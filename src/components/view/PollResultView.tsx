import ForgeUI, { Text, Fragment, Heading, Button } from "@forge/ui";

import { formatPollTopic } from "../../lib/getAgendaName";

export default function PollResultView({ data }) {
  console.log("meetingFormData-polls", data);
  const pollType = data.type === "meetingPoll" ? "Meeting" : "Regular";

  const topics = data ? formatPollTopic(data) : null;

  console.log("topics", topics);

  return (
    <Fragment>
      <Heading size="medium">Polls Details ({pollType})</Heading>
      <Text>Title: {data.title}</Text>
      <Text>Description: {data.description}</Text>
      {data?.link && <Text>Link: {data?.link}</Text>}
      {data?.meetingDate && <Text>Meeting Date: {data?.meetingDate}</Text>}
      {topics.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
      <Button
        text="Publish"
        icon="arrow-right"
        iconPosition="after"
        onClick={() => null}
      />
    </Fragment>
  );
}
