import { formatDate } from "@/lib/isDateValid";
import ForgeUI, {
  ModalDialog,
  Fragment,
  Text,
  Strong,
  Link,
  Em,
  DateLozenge,
  User,
} from "@forge/ui";

export default function PollModal({ setPollModal, data }) {
  const meetingDate = data?.meetingDate ? formatDate(data?.meetingDate) : null;
  const optionText =
    data.type === "meetingPoll" ? "Topics to be discussed" : "Poll Options";

  function modalHandler() {
    setPollModal(false);
  }
  return (
    <ModalDialog
      header="Welcome to Polls, plan your meeting succintly."
      onClose={modalHandler}
    >
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
            <Link href={data?.link}>{data?.link}</Link>
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
        {data.topics &&
          data.topics?.map((item, index) => (
            <Text key={item}>
              {index + 1}. <Em>{item}</Em>
            </Text>
          ))}
        {data.userDetails !== null && (
          <Text>
            <Strong>Author: </Strong>
            <User accountId={data.userDetails.accountId} />
          </Text>
        )}
      </Fragment>
    </ModalDialog>
  );
}
