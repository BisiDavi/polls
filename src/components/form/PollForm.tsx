import usePollForm from "@/hooks/usePollForm";
import ForgeUI, { Fragment } from "@forge/ui";

import PollResultView from "../view/PollResultView";
import MeetingPollForm from "./MeetingPollForm";
import RegularPollForm from "./RegularPollForm";

export default function PollForm({ type, appPoll, formType, setPollType }) {
  const {
    data,
    onSubmitRegular,
    onSubmitMeeting,
    validDate,
    agenda,
    setAgenda,
  } = usePollForm(setPollType, formType);

  return (
    <Fragment>
      {type.includes("View") ? (
        <PollResultView data={data} appPoll={appPoll} />
      ) : type === "Meeting" ? (
        <MeetingPollForm
          validDate={validDate}
          agenda={agenda}
          setAgenda={setAgenda}
          onSubmit={onSubmitMeeting}
        />
      ) : (
        type === "Regular" && <RegularPollForm onSubmit={onSubmitRegular} />
      )}
    </Fragment>
  );
}
