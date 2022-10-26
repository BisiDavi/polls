import ForgeUI, {
  Fragment,
  Text,
  Strong,
  Link,
  Em,
  DateLozenge,
  User,
} from "@forge/ui";

import { formatPollTopic } from "../../lib/getAgendaName";
import { formatDate } from "../../lib/isDateValid";

export default function PollModalDetailsView({ data }) {
  const meetingDate = data?.meetingDate ? formatDate(data?.meetingDate) : null;
  const optionText =
    data.type === "meetingPoll" ? "Topics to be discussed" : "Poll Options";
  const formatPollType = data.type === "meetingPoll" ? "agenda" : "poll";
  const topics = data ? formatPollTopic(data, formatPollType) : null;

  console.log("data", data);

  return (
    <Fragment>
      <Text>
        <Strong>Title: </Strong>
        {data.title}
      </Text>
      <Text>
        <Strong>Description: </Strong>
        {data.description}
      </Text>
      {data?.duration && (
        <Text>
          <Strong>Duration: </Strong>
          {data.duration}
        </Text>
      )}
      {data?.link && (
        <Text>
          <Strong>Link: </Strong>
          <Link href={data?.link} openNewTab>
            {data?.link}
          </Link>
        </Text>
      )}
      {data?.meetingDate && (
        <Text>
          <Strong>Meeting Date: </Strong>
          <DateLozenge value={new Date(meetingDate).getTime()} />
        </Text>
      )}
      {data.accountId !== null && (
        <Text>
          <Strong>Author: </Strong>
          <User accountId={data?.accountId} />
        </Text>
      )}
      <Text>
        <Strong>{optionText}</Strong>
      </Text>
      {topics &&
        topics?.map((item, index) => (
          <Text key={item}>
            {index + 1}. <Em>{item}</Em>
          </Text>
        ))}
    </Fragment>
  );
}
