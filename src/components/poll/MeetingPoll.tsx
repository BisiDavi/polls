import ForgeUI, {
  Fragment,
  Text,
  Em,
  useState,
  Form,
  Image,
  Strong,
  useEffect,
  SectionMessage,
  useProductContext,
  Button,
} from "@forge/ui";
import { v4 as uuidv4 } from "uuid";

import PollsFieldSet from "../form/PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";
import useStorage from "../../hooks/useStorage";
import toSlug from "../../lib/toSlug";
import PollList from "./PollList";
import isDateValid from "../../lib/isDateValid";

export default function MeetingPoll({
  pollOptions,
  data,
  suggestedAgenda,
  setSuggestedAgenda,
  saveAgendaStatus,
  setSaveAgendaStatus,
}) {
  const [existingData, setExistingData] = useState(null);
  const { saveData, getDataFromStorage } = useStorage();
  const context = useProductContext();

  const agendaText = pollOptions.length > 1 ? "Agendas" : "Agenda";
  const dataKey = `Agenda-${toSlug(data.title)}-${uuidv4()}`;

  console.log("data-data", data);

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
    await saveData(dataKey, dataArray).then(() => {
      setSaveAgendaStatus(true);
    });
  }

  const isMeetingValid = isDateValid(data.meetingDate);

  console.log("isMeetingValid", isMeetingValid);

  return (
    <Fragment>
      {!isMeetingValid ? (
        <Fragment>
          <Text>
            <Strong>
              {agendaText} to be discussed in the meeting "{data.title}":
            </Strong>
          </Text>
          <PollList pollData={pollOptions} />
          <Text>
            <Em>
              Do you have any <Strong>agenda</Strong> to add to this Meeting?
            </Em>
          </Text>
          {saveAgendaStatus && (
            <SectionMessage appearance="confirmation">
              <Text>Suggested Agenda Submitted</Text>
            </SectionMessage>
          )}
          {!saveAgendaStatus ? (
            <Form
              onSubmit={onSubmit}
              submitButtonText="Submit Suggested Agenda"
            >
              <PollsFieldSet
                type="suggested"
                poll={suggestedAgenda}
                setPoll={setSuggestedAgenda}
              />
            </Form>
          ) : (
            <Button
              icon="add-item"
              iconPosition="before"
              text="New Agenda"
              onClick={() => setSaveAgendaStatus(false)}
            />
          )}
        </Fragment>
      ) : (
        <Fragment>
          <Image
            src="https://res.cloudinary.com/verrb-inc/image/upload/v1666959221/error_zaf55u.gif"
            alt="meeting date expired"
          />
          <Text>
            Meeting date has expired, you can't suggest any agenda for this meeting.
          </Text>
        </Fragment>
      )}
    </Fragment>
  );
}
