import ForgeUI, {
  useEffect,
  Fragment,
  Text,
  Em,
  Button,
  useState,
  Heading,
  ButtonSet,
  SectionMessage,
} from "@forge/ui";

import useStorage from "../../hooks/useStorage";
import toSlug from "../../lib/toSlug";
import ChartTabs from "../tabs/ChartTabs";
import { getVoteOptionCount } from "../../lib/formatVote";

export default function RegularPollItem({ pollOptions, user, title }) {
  const [poll, makePoll] = useState(null);
  const [pollData, setPollData] = useState([]);
  const [submitPoll, setSubmitPollStatus] = useState(false);
  const { saveData, getDataFromStorage } = useStorage();

  const dataKey = `Vote-${toSlug(title)}`;

  const voteOptionData =
    pollData.length > 0 ? getVoteOptionCount(pollData[0].value) : null;

  console.log("pollData[0]", pollData);
  console.log("pollData[0]?.value", pollData[0]?.value);
  console.log("voteOptionData", voteOptionData);
  console.log("voteOptionData[0]", voteOptionData[0].user);
  console.log("voteOptionData[1]", voteOptionData[1].user);

  const titleText = title.toLowerCase().includes("poll")
    ? title
    : `${title} Poll`;

  useEffect(async () => {
    await getDataFromStorage(dataKey).then((response) => {
      console.log("response", response);
      setPollData(response.results);
    });
  }, [poll]);

  function saveRegularPoll(item: string) {
    makePoll(item);
  }

  function resetHandler() {
    makePoll(null);
    setSubmitPollStatus(false);
  }

  async function onSubmitHandler() {
    const dateInstance = new Date();
    const dataObj = {
      date: dateInstance.toISOString(),
      author: user,
      vote: poll,
    };
    const existingData = pollData.length > 0 ? pollData[0].value : "";
    const data = [...existingData, dataObj];
    await saveData(dataKey, data)
      .then(() => {
        return setSubmitPollStatus(true);
      })
      .catch(() => {
        return setSubmitPollStatus(null);
      });
  }

  const disableButtonStatus = !poll ? true : false;

  return (
    <Fragment>
      <Heading>{titleText}</Heading>
      <Text>
        <Em>Note: Click on the Button to Vote</Em>
      </Text>
      {submitPoll && (
        <SectionMessage title="Poll Status" appearance="confirmation">
          <Text>Poll Submitted Successfully</Text>
        </SectionMessage>
      )}
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
