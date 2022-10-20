import ForgeUI, { Text, Fragment, useState, useEffect } from "@forge/ui";

import usePublish from "../../hooks/usePublish";

export default function AppPollView({ appPoll }) {
  const [savedPolls, setSavedPolls] = useState(null);
  const { getSavedPolls } = usePublish();
  const polls = [];

  if (savedPolls !== null) {
    savedPolls.map((item) => {});
  }

  useEffect(async () => {
    if (savedPolls === null) {
      await getSavedPolls().then((response) => {
        console.log("savedpolls-response", response);
        let pollData = {};
        response.results.map((item: any) => {
          pollData = {
            value: JSON.parse(item.value),
            key: JSON.parse(item.key),
          };
          polls.push(pollData);
        });
        setSavedPolls(polls);
      });
    }
  }, []);

  console.log("savedPolls", savedPolls);

  return (
    <Fragment>
      <Text>AppPollView</Text>
    </Fragment>
  );
}
