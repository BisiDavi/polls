import ForgeUI, { Text, Fragment, useState, useEffect } from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

import usePublish from "../../hooks/usePublish";

export default function AppPollView() {
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
  const [appPoll, setAppPolls] = useContentProperty("appPoll", "");

  return (
    <Fragment>
      <Text>AppPollView</Text>
    </Fragment>
  );
}
