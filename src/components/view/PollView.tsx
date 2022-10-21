import ForgeUI, { Fragment } from "@forge/ui";

import PollResultView from "./PollResultView";
import MeetingPollForm from "../form/MeetingPollForm";
import RegularPollForm from "../form/RegularPollForm";
import usePollView from "../../hooks/usePollView";

export default function PollView({ type, appPoll, formType, setPollType }) {
  const {
    data,
    onSubmitRegular,
    onSubmitMeeting,
    validDate,
    agenda,
    setAgenda,
  } = usePollView(setPollType, formType);

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
