import ForgeUI, {
  Text,
  Fragment,
  Heading,
  Link,
  Button,
  Strong,
  User,
  DateLozenge,
  useProductContext,
} from "@forge/ui";

import PollList from "../poll/PollList";
import usePollResultView from "../../hooks/usePollResultView";
import MeetingLinkForm from "../form/MeetingLinkForm";
import MeetingLinkView from "./MeetingLinkView";

export default function PollResultView({
  data,
  setAppPoll,
  setModal,
  setSavedPolls,
}) {
  const context = useProductContext();
  const {
    meetingDate,
    publishDataHandler,
    topics,
    pollType,
    optionText,
    setMeetingLink,
    setFormState,
    meetingLinkResult,
  } = usePollResultView(setAppPoll, setSavedPolls, setModal, data);

  return (
    <Fragment>
      <Heading size="medium">Polls Details ({pollType})</Heading>
      {data && (
        <Fragment>
          <Text>
            <Strong>Title: </Strong>
            {data.title}
          </Text>
          <Text>
            <Strong>Description: </Strong>
            {data.description}
          </Text>
          {data.type === "meetingPoll" && (
            <Text>
              <Strong>Time:</Strong>
              {data.time}
            </Text>
          )}
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
          <Text>
            <Strong>{optionText}</Strong>
          </Text>
          <PollList pollData={topics} type="italics" />
          <Text>
            <Strong>Author: </Strong>
            <User accountId={context.accountId} />
          </Text>
        </Fragment>
      )}
      {data.type === "meetingPoll" && !meetingLinkResult && (
        <MeetingLinkForm
          data={data}
          setMeetingLink={setMeetingLink}
          setFormState={setFormState}
        />
      )}
      <MeetingLinkView meetingLinkResult={meetingLinkResult} />
      {meetingLinkResult && (
        <Button
          text="Publish"
          icon="book"
          iconPosition="before"
          appearance="primary"
          onClick={publishDataHandler}
        />
      )}
    </Fragment>
  );
}
