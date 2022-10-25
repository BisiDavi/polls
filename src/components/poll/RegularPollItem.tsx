import ForgeUI, {
  useEffect,
  Fragment,
  Text,
  Em,
  Button,
  useState,
  Heading,
  ButtonSet,
} from "@forge/ui";

import useStorage from "../../hooks/useStorage";
import toSlug from "../../lib/toSlug";
import ChartTabs from "../tabs/ChartTabs";

export default function RegularPollItem({ pollOptions, user, title }) {
  const [poll, makePoll] = useState(null);
  const [pollData, setPollData] = useState(null);
  const { saveData, getDataFromStorage } = useStorage();

  const dataKey = `Vote-${toSlug(title)}`;

  console.log("pollData", pollData);

  const titleText = title.toLowerCase().includes("poll")
    ? title
    : `${title} Poll`;

  useEffect(async () => {
    await getDataFromStorage(dataKey).then((response) => {
      setPollData(response.results);
    });
  }, [poll]);

  function saveRegularPoll(item: string) {
    makePoll(item);
  }

  function resetHandler() {
    makePoll(null);
  }

  function onSubmitHandler() {
    const dateInstance = new Date();
    const dataObj = {
      date: dateInstance.toISOString(),
      author: user,
      vote: poll,
    };
    const existingData = pollData ? pollData : "";
    const data = [...existingData, dataObj];
    saveData(dataKey, data);
  }

  const disableButtonStatus = !poll ? true : false;

  return (
    <Fragment>
      <Heading>{titleText}</Heading>
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
              onClick={() => saveRegularPoll(item)}
              disabled={disableButton}
            />
          );
        })}
      <ButtonSet>
        <Button
          text="Submit"
          icon="send"
          appearance="primary"
          onClick={onSubmitHandler}
          disabled={disableButtonStatus}
        />
        <Button
          text="Reset"
          icon="error"
          appearance="danger"
          onClick={resetHandler}
          disabled={disableButtonStatus}
        />
      </ButtonSet>
      <ChartTabs data={pollData} />
    </Fragment>
  );
}
