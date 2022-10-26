import ForgeUI, { Text, Fragment, Heading, Button } from "@forge/ui";

import pollContent from "../../json/pollview.json";

export default function MeetingPollView({ setPollType }) {
  function buttonHandler() {
    setPollType("Meeting");
  }

  return (
    <Fragment>
      <Heading size="small">
        Manage Meetings - Allow Team members To Contribute To Meeting
        Agenda before the Meeting.
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
