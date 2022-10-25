import ForgeUI, {
  Fragment,
  Text,
  Em,
  Button,
  Heading,
  useState,
} from "@forge/ui";

import { formatPollTopic } from "../../lib/getAgendaName";

export default function MakePollModalView({ data }) {
  const formatPollType = data.type === "meetingPoll" ? "topic" : "poll";
  const topics = data ? formatPollTopic(data, formatPollType) : null;
  const [poll, makePoll] = useState(null);

  console.log("poll", poll);

  return (
    <Fragment>
      <Heading>{data.title}</Heading>
      <Text>
        <Em>Note: Click on the Button to Vote</Em>
      </Text>
      {topics &&
        topics?.map((item, index) => {
          const buttonAppearance: any = poll === item ? "primary" : "subtle";

          const buttonIcon = poll === item ? "check-circle" : "presence-active";
          console.log("buttonAppearance", buttonAppearance);
          const disableButton =
            poll === null ? false : poll === item ? false : true;

          return (
            <Button
              iconPosition="before"
              key={index}
              icon={buttonIcon}
              appearance="primary"
              text={item}
              onClick={() => makePoll(item)}
              disabled={disableButton}
            />
          );
        })}
      <Button
        text="Reset"
        icon="error"
        appearance="danger"
        onClick={() => makePoll(null)}
      />
    </Fragment>
  );
}
