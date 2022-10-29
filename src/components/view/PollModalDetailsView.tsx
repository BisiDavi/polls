import ForgeUI, {
  Fragment,
  Text,
  Strong,
  Link,
  DateLozenge,
  User,
} from "@forge/ui";

import { formatPollAgenda } from "../../lib/getAgendaName";
import { formatDate } from "../../lib/isDateValid";
import PollList from "../poll/PollList";

export default function PollModalDetailsView({ data }) {
  const meetingDate = data?.meetingDate ? formatDate(data?.meetingDate) : null;
  const optionText =
    data.type === "meetingPoll" ? "Agendas to be discussed" : "Poll Options";
  const formatPollType = data.type === "meetingPoll" ? "agenda" : "poll";
  const topics = data ? formatPollAgenda(data, formatPollType) : null;

  const durationText = data?.duration > 1 ? " hrs" : " hr";

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
      {data?.time && (
        <Text>
          <Strong>Time:</Strong>
          {data.time}
        </Text>
      )}
      {data?.duration && (
        <Text>
          <Strong>Duration: </Strong>
          {data.duration}
          {!data.duration.includes("hr") && durationText}
        </Text>
      )}
      {data?.link && (
        <Fragment>
          <Text>
            <Strong>Start Url (Host): </Strong>
            <Link href={data?.link?.start_url} openNewTab>
              {data?.link.start_url}
            </Link>
          </Text>
          <Text>
            <Strong>Join Url (Invite): </Strong>
            <Link href={data?.link?.join_url} openNewTab>
              {data?.link.join_url}
            </Link>
          </Text>
          <Text>
            <Strong>Meeting Password: </Strong>
            {data?.link?.password}
          </Text>
        </Fragment>
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
      <PollList pollData={topics} type="italics" />
    </Fragment>
  );
}
