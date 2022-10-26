import ForgeUI, {
  Text,
  Fragment,
  Heading,
  Link,
  Strong,
  User,
  DateLozenge,
  Em,
} from "@forge/ui";
import PollList from "../poll/PollList";

export default function AppMeetingPollView({ polls }) {
  return (
    <Fragment>
      <Heading size="medium">Polls Details ({polls})</Heading>
      <Text>
        <Strong>Title: </Strong>
        {polls.title}
      </Text>
      <Text>
        <Strong>Description: </Strong>
        {polls.description}
      </Text>
      {polls?.duration && (
        <Text>
          <Strong>Duration: </Strong>
          {polls.duration}
        </Text>
      )}
      {polls?.link && (
        <Text>
          <Strong>Link: </Strong>
          <Link href={polls?.link} openNewTab>
            {polls?.link}
          </Link>
        </Text>
      )}
      {polls?.meetingDate && (
        <Text>
          <Strong>Meeting Date: </Strong>
          <DateLozenge value={new Date(polls).getTime()} />
        </Text>
      )}
      <Text>
        <Strong>{polls}</Strong>
      </Text>
      <PollList pollData={polls} type="italics" />
      {polls !== null && (
        <Text>
          <Strong>Author: </Strong>
          <User accountId={polls.accountId} />
        </Text>
      )}
    </Fragment>
  );
}
