import ForgeUI, {
  Fragment,
  Image,
  SectionMessage,
  Strong,
  Text,
  useProductContext,
  User,
} from "@forge/ui";

import { formatPollAgenda } from "../../lib/getAgendaName";
import PollList from "../poll/PollList";
import { formatAgendaDate } from "../../lib/formatMeeting";
import NotifyTeam from "../view/NotifyTeam";
import useSuggestedAgenda from "../../hooks/useSuggestedAgenda";

export default function MeetingTab({ data, saveAgendastatus }) {
  const { agendas, suggestedAgenda } = useSuggestedAgenda(
    data,
    saveAgendastatus
  );
  const context = useProductContext();

  return (
    <Fragment>
      <Text>
        <Strong>List of Agenda for the Meeting (By the Meeting host)</Strong>
      </Text>
      <PollList pollData={agendas} />
      {suggestedAgenda.length > 0 && (
        <Fragment>
          <Image
            src="https://res.cloudinary.com/verrb-inc/image/upload/v1666751407/Screenshot_2022-10-26_at_3.28.09_AM_oenkj6.png"
            alt="underline"
          />
          <Text>
            <Strong>Suggested Agenda</Strong>
          </Text>
        </Fragment>
      )}
      {suggestedAgenda.length > 0
        ? suggestedAgenda.map((item) => {
            const date = formatAgendaDate(item.date);
            const formatAgenda = formatPollAgenda(item, "suggest");
            return (
              <Text key={item.date}>
                <Strong>-</Strong>
                {formatAgenda[0]}
                {`         `}
                <User accountId={item.author} />
                {`         `}({date})
              </Text>
            );
          })
        : suggestedAgenda.length === 0 && (
            <SectionMessage title="Suggested Agenda" appearance="info">
              <Text>
                <Strong>No suggested Agenda from the team</Strong>
              </Text>
            </SectionMessage>
          )}
      {suggestedAgenda.length > 0 && context.accountId === data.accountId && (
        <NotifyTeam data={data} suggestedAgenda={suggestedAgenda} />
      )}
    </Fragment>
  );
}
