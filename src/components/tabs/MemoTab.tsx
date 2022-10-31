import ForgeUI, {
  Form,
  Fragment,
  SectionMessage,
  Strong,
  Text,
  TextArea,
  useState,
} from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";
import isDateValid from "../../lib/isDateValid";

import toSlug from "../../lib/toSlug";

export default function MemoTab({ data }) {
  const meetingTitleSlug = toSlug(data.title);
  const [meetingMemo, setMeetingMemo] = useContentProperty(
    `meeting-${meetingTitleSlug}`,
    undefined
  );
  const [formState, setFormState] = useState(null);
  const [meetingStatus, setMeetingStatus] = useState(null);
  const isMeetingValid = isDateValid(data.meetingDate);

  async function onSubmit(formData) {
    if (!isMeetingValid) {
      formData: {
        memo: "";
      }
      setFormState(formData?.memo);
      await setMeetingMemo(formData?.memo);
    } else {
      setMeetingStatus("meeting-not-yet-done");
    }
  }

  return (
    <Fragment>
      <Text>
        <Strong>
          Now that you're done with the Meeting ({data.title}), Send your Team,
          a memo of this meeting via email
        </Strong>
      </Text>
      {meetingMemo === undefined ? (
        <Fragment>
          {formState !== null && (
            <SectionMessage title="Memo status" appearance="confirmation">
              <Text>{data.title} meeting memo sent</Text>
            </SectionMessage>
          )}
          {meetingStatus === "meeting-not-yet-done" && (
            <SectionMessage title="Memo status" appearance="confirmation">
              <Text>
                {data.title} meeting not yet done, you can't send a post meeting
                memo for a meeting that haven't been done yet.
              </Text>
            </SectionMessage>
          )}
          <Form
            onSubmit={onSubmit}
            submitButtonText="Send Memo"
            submitButtonAppearance="primary"
          >
            <TextArea
              name="memo"
              label="Enter your meeting memo"
              placeholder="Now that you're done with the meeting, send your team the meeting memo, for reference purpose."
              isRequired
            />
          </Form>
        </Fragment>
      ) : (
        <SectionMessage title="Memo status" appearance="info">
          <Text>You've already sent your team, this meeting memo earlier</Text>
        </SectionMessage>
      )}
    </Fragment>
  );
}
