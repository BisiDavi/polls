import useStorage from "@/hooks/useStorage";
import toSlug from "@/lib/toSlug";
import ForgeUI, {
  useEffect,
  Fragment,
  Text,
  Em,
  Button,
  useState,
} from "@forge/ui";

import PollChartView from "../view/PollChartView";

export default function RegularPollItem({ pollOptions, user, title }) {
  const [poll, makePoll] = useState(null);
  const [pollData, setPollData] = useState(null);
  const { saveData, getDataFromStorage } = useStorage();

  const dataKey = `vote-${toSlug(title)}`;

  useEffect(async () => {
    await getDataFromStorage(dataKey).then((response) => {
      setPollData(response.results);
    });
  }, []);

  function saveRegularPoll() {
    const dateInstance = new Date();
    const dataObj = {
      date: dateInstance.toISOString(),
      author: user,
      vote: poll,
    };
    const existingData = pollData ? pollData : "";
    const data = [...existingData, dataObj];
    saveData("dataKey", data);
  }

  function resetHandler() {}

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
      {poll && (
        <Button
          text="Reset"
          icon="error"
          appearance="danger"
          onClick={() => makePoll(null)}
        />
      )}
    </Fragment>
  );
}
