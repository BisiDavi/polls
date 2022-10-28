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
  useProductContext,
  User,
  Image,
} from "@forge/ui";

import { isTimeValid } from "../../lib/isDateValid";
import useStorage from "../../hooks/useStorage";
import toSlug from "../../lib/toSlug";
import ChartTabs from "../tabs/ChartTabs";
import RegularPollTimer from "./RegularPollTimer";

export default function RegularPoll({ pollOptions, data }) {
  const [poll, makePoll] = useState(null);
  const [pollData, setPollData] = useState([]);
  const [notify, setNotify] = useState(false);
  const [submitPoll, setSubmitPollStatus] = useState(false);
  const { saveData, getDataFromStorage } = useStorage();
  const context = useProductContext();

  const dataKey = `Vote-${toSlug(data.title)}`;

  const titleText = data.title.toLowerCase().includes("poll")
    ? data.title
    : `${data.title} Poll`;

  useEffect(async () => {
    await getDataFromStorage(dataKey).then((response) => {
      setPollData(response.results);
    });
  }, [poll]);

  function saveRegularPoll(item: string) {
    if (!hasVotedBefore) {
      makePoll(item);
    } else {
      setNotify(true);
    }
  }

  function resetHandler() {
    makePoll(null);
    setSubmitPollStatus(false);
  }

  const checkPolls = pollData[0]?.value.filter(
    (item) => item.author === context.accountId
  )[0];

  const hasVotedBefore =
    pollData.length > 0 ? (checkPolls ? true : false) : false;

  async function onSubmitHandler() {
    const dateInstance = new Date();
    const dataObj = {
      date: dateInstance.toISOString(),
      author: context.accountId,
      vote: poll,
    };
    const existingData = pollData.length > 0 ? pollData[0].value : "";
    const data = [...existingData, dataObj];
    await saveData(dataKey, data)
      .then(async () => {
        await getDataFromStorage(dataKey).then((response) => {
          setPollData(response.results);
        });
        return setSubmitPollStatus(true);
      })
      .catch(() => {
        return setSubmitPollStatus(null);
      });
  }

  const disableButtonStatus = !poll ? true : false;
  const pollChartData = { pollOptions, title: data.title, pollData };
  const isTimerValid = isTimeValid("2022-10-28T17:41:50.783Z");

  return (
    <Fragment>
      <Heading>{titleText}</Heading>
      {isTimerValid && <RegularPollTimer deadline="2022-10-28T17:41:50.783Z" />}
      {isTimerValid ? (
        <Fragment>
          <Text>
            <Em>Note: Click on the Button to Vote</Em>
          </Text>
          {notify && (
            <SectionMessage title="Poll Alert" appearance="error">
              <Text>
                <User accountId={checkPolls.author} /> {"    "}
                You've voted earlier, you can only vote once.
              </Text>
            </SectionMessage>
          )}
          {submitPoll && (
            <SectionMessage title="Poll Status" appearance="confirmation">
              <Text>Poll Submitted Successfully</Text>
              <Text>Thanks, for participating in the Poll</Text>
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
          {!submitPoll && (
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
          )}
        </Fragment>
      ) : (
        <Fragment>
          <Image
            src="https://res.cloudinary.com/verrb-inc/image/upload/v1666959221/error_zaf55u.gif"
            alt="poll has expired"
          />
          <Text>This Poll has ended.</Text>
        </Fragment>
      )}
      <ChartTabs data={pollChartData} />
    </Fragment>
  );
}
