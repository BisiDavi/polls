import ForgeUI, { Text, Fragment, useState, useEffect } from "@forge/ui";

import usePublish from "../../hooks/usePublish";

export default function AppPollView({ appPoll }) {
  const [savedPolls, setSavedPolls] = useState(null);
  const { getSavedPolls } = usePublish();
  const polls = [];

  useEffect(async () => {
    if (savedPolls === null) {
      await getSavedPolls().then((response) => {
        let pollData = {};
        response.results.map((item: any) => {
          pollData = {
            value: JSON.parse(item?.value),
            key: item.key,
          };
          polls.push(pollData);
        });
        setSavedPolls(polls);
      });
    }
  }, []);

  console.log("savedPolls", savedPolls);
  console.log("appPoll-AppPollView", appPoll);

  return (
    <Fragment>
      <Text>AppPollView</Text>
    </Fragment>
  );
}
