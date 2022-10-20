import ForgeUI, { Text, Fragment, useState, useEffect } from "@forge/ui";

import usePublish from "../../hooks/usePublish";

export default function AppPollView({ appPoll }) {
  const [savedPolls, setSavedPolls] = useState(null);
  const { getSavedPolls } = usePublish();

  useEffect(async () => {
    if (savedPolls === null) {
      await getSavedPolls().then((response) => {
        console.log("savedpolls-response", response);
        setSavedPolls(response.results);
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
