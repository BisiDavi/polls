import ForgeUI, { Text, Fragment, Heading, Button } from "@forge/ui";

import pollContent from "../../json/pollview.json";

export default function MeetingPollView({ setPollType, setPollResult }) {
  function buttonHandler() {
    setPollType("Meeting");
    setPollResult("");
  }

  return (
    <Fragment>
      <Heading size="small">
        Manage Team Meetings - Allow Team members To Contribute To Meeting
        Topics before the Meeting.
      </Heading>
      {pollContent.meeting.map((item) => (
        <Text key={item}>{item}</Text>
      ))}

      <Button
        text="Get Started With Meeting Polls"
        icon="arrow-right"
        iconPosition="after"
        appearance="primary"
        onClick={buttonHandler}
      />
    </Fragment>
  );
}
