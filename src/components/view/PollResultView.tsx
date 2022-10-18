import ForgeUI, { Text, Fragment, Heading, Button } from "@forge/ui";

export default function PollResultView({ data }) {
  console.log("meetingFormData-polls", data);
  const pollType = data.type === "meetingPoll" ? "Meeting" : "Regular";

  const topics = data?.topic ? [] : null;

  return (
    <Fragment>
      <Heading size="medium">Polls Details ({pollType})</Heading>
      <Text>Title: {data.title}</Text>
      {data?.link && (
        <Text>
          Link: <Heading size="small">{data?.link}</Heading>
        </Text>
      )}
      <Text>Description: {data.description}</Text>
      {data?.meetingDate && <Text>Meeting Date: {data?.meetingDate}</Text>}

      <Button
        text="Publish"
        icon="arrow-right"
        iconPosition="after"
        onClick={() => null}
      />
    </Fragment>
  );
}
