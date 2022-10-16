import ForgeUI, { Text, Fragment, Heading, Button } from "@forge/ui";

import pollContent from "../../json/pollview.json";

export default function MeetingView({ setPollType }) {
  return (
    <Fragment>
      <Heading size="medium">Make Meeting Agenda Polls.</Heading>
      {pollContent.meeting.map((item) => (
        <Text key={item}>{item}</Text>
      ))}

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
