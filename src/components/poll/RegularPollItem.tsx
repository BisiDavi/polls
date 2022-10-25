import ForgeUI, { Fragment, Text, Em, Button, useState } from "@forge/ui";

import PollChartView from "../view/PollChartView";

export default function RegularPollItem({ pollOptions }) {
  const [poll, makePoll] = useState(null);

  return (
    <Fragment>
      <Text>
        <Em>Note: Click on the Button to Vote</Em>
      </Text>
      {pollOptions &&
        pollOptions?.map((item, index) => {
          const buttonIcon =
            poll === item ? "check-circle-outline" : "presence-active";
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
      <PollChartView pollOptions={pollOptions} poll={poll} />
      <Button
        text="Reset"
        icon="error"
        appearance="danger"
        onClick={() => makePoll(null)}
      />
    </Fragment>
  );
}
