import ForgeUI, { Text, Fragment, Heading, Button } from "@forge/ui";
 
export default function MeetingView({ setPollType }) {
  return (
    <Fragment>
      <Heading size="medium">Make Meeting Agenda Polls.</Heading>
      <Text>
        1. Let your team-mate vote on meeting agenda based on priority
      </Text>
      <Text>2. Team mate can add/suggest new meeting agenda </Text>
      <Text>3. Allocate time for each agenda</Text>
      <Text>4. Make a summary of your meeting, for easy reference</Text>
      <Text>5. Publish Poll</Text>

      <Button
        text="Get Started With Meeting Polls"
        icon="arrow-right"
        iconPosition="after"
        appearance="primary"
        onClick={() => setPollType("Meeting")}
      />
    </Fragment>
  );
}
 