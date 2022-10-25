import ForgeUI, { Fragment, Text, Em } from "@forge/ui";

import { formatPollTopic } from "../../lib/getAgendaName";

export default function MakePollModalView({ data }) {
  const formatPollType = data.type === "meetingPoll" ? "topic" : "poll";
  const topics = data ? formatPollTopic(data, formatPollType) : null;

  return (
    <Fragment>
      <Text>
        Poll for
        {data.title}
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
