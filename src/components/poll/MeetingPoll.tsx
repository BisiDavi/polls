import ForgeUI, {
  Fragment,
  Text,
  Em,
  useState,
  Form,
  Strong,
  useEffect,
  SectionMessage,
} from "@forge/ui";

import PollsFieldSet from "../form/PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";
import useStorage from "../../hooks/useStorage";
import toSlug from "../../lib/toSlug";
import PollList from "./PollList";
import useUser from "@/hooks/useUser";

export default function MeetingPoll({
  pollOptions,
  title,
  suggestedAgenda,
  setSuggestedAgenda,
}) {
  const [existingData, setExistingData] = useState(null);
  const { saveData, getDataFromStorage } = useStorage();
  const [saveAgendastatus, setSaveAgendaStatus] = useState(false);
  const { context } = useUser();

  const agendaText = pollOptions.length > 1 ? "Agendas" : "Agenda";
  const dataKey = `Agenda-${toSlug(title)}`;

  useEffect(async () => {
    getDataFromStorage(dataKey).then((response) => {
      setExistingData(response.results);
    });
  }, []);

  async function onSubmit(formData) {
    const agendaObj = formatFormPoll(suggestedAgenda);
    const dateInstance = new Date();
    const formstateData = {
      ...agendaObj,
      ...formData,
      author: context.accountId,
      date: dateInstance.toISOString(),
    };
    const previousData = existingData ? existingData : "";
    const dataArray = [...previousData, formstateData];
    console.log("dataArray", dataArray);
    await saveData(dataKey, dataArray).then(() => {
      setSaveAgendaStatus(true);
    });
  }

  return (
    <Fragment>
      <Text>
        <Strong>
          {agendaText} to be discussed in the meeting "{title}":
        </Strong>
      </Text>
      <PollList pollData={pollOptions} />
      <Text>
        <Em>
          Do you have any <Strong>agenda</Strong> to add to this Meeting?
        </Em>
      </Text>
      {saveAgendastatus && (
        <SectionMessage appearance="confirmation">
          <Text>Suggested Agenda Submitted</Text>
        </SectionMessage>
      )}
      <Form onSubmit={onSubmit} submitButtonText="Submit Suggested Agenda">
        <PollsFieldSet
          type="suggested"
          poll={suggestedAgenda}
          setPoll={setSuggestedAgenda}
        />
      </Form>
    </Fragment>
  );
}
