import ForgeUI, {
  Fragment,
  Text,
  Em,
  useState,
  Form,
  Strong,
  Heading,
  useEffect,
} from "@forge/ui";

import PollsFieldSet from "../form/PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";
import useStorage from "../../hooks/useStorage";
import toSlug from "../../lib/toSlug";

export default function MeetingPoll({ pollOptions, currentUser, title }) {
  const [agenda, setAgenda] = useState(["Agenda 1"]);
  const [existingData, setExistingData] = useState(null);
  const { saveData, getDataFromStorage } = useStorage();

  const agendaText = pollOptions.length > 1 ? "Agendas" : "Agenda";
  const dataKey = `Agenda-${toSlug(title)}`;

  useEffect(async () => {
    getDataFromStorage(dataKey).then((response) => {
      setExistingData(response.results);
    });
  }, []);

  async function onSubmit(formData) {
    const agendaObj = formatFormPoll(agenda);
    const dateInstance = new Date();
    console.log("formData", formData);
    const formstateData = {
      ...agendaObj,
      ...formData,
      author: currentUser,
      date: dateInstance.toISOString(),
    };
    const previousData = existingData ? existingData : "";
    const dataArray = [...previousData, formstateData];
    saveData(dataKey, dataArray);
  }

  return (
    <Fragment>
      <Heading>
        {agendaText} to be discussed in the meeting "{title}":
      </Heading>
      {pollOptions.map((item, index) => (
        <Text key={index}>
          {index + 1}. {item}
        </Text>
      ))}
      <Text>
        <Em>
          Do you have any <Strong>agenda</Strong> to add to this Meeting?
        </Em>
      </Text>
      <Form onSubmit={onSubmit} submitButtonText="Submit Agenda">
        <PollsFieldSet type="meeting" poll={agenda} setPoll={setAgenda} />
      </Form>
      
    </Fragment>
  );
}
