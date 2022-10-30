import ForgeUI, {
  Button,
  Form,
  Fragment,
  SectionMessage,
  Strong,
  Text,
  TextArea,
  useEffect,
  useState,
} from "@forge/ui";
import { fetch } from "@forge/api";

import { formatPollAgenda } from "../../lib/getAgendaName";

export default function NotifyTeam({ data }) {
  const [notify, setNotify] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState(undefined);

  function notifyHandler() {
    setNotify(true);
    setSubmitted(false);
  }

  async function onSubmit(formData) {
    formData: {
      teamEmail: "";
    }
    setFormState(formData);
  }

  console.log("formState", formState);
  const pollType = data.type === "meetingPoll" ? "Meeting" : "Poll";

  useEffect(async () => {
    if (formState !== undefined && !submitted) {
      const messageLink =
        typeof data.link === "string"
          ? `Meeting link:${data.link}`
          : `Start Url (Host):${data.link.start_url}\nJoin Url(Invite):${data.link.join_url}\nMeeting Password:${data.link.password}`;
      let agendaString = "";
      const formatPollType = data.type === "meetingPoll" ? "agenda" : "poll";
      const agendasArray = data ? formatPollAgenda(data, formatPollType) : null;
      agendasArray &&
        agendasArray.map((item) => {
          agendaString += `-${item}\n`;
        });

      const meetingData = `Title:${data.title}\nDescription:${data.description}\nTime:${data.time}\nDuration:${data.duration}\n${messageLink}\nMeeting Date:${data.meetingDate}\n\n\n\n\nAgendas to be discussed:\n${agendaString}}`;

      await fetch("https://confluence-api.vercel.app/api/gmail/mail/send", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          receipent: formState.teamEmail,
          message: meetingData,
        }),
      }).then(() => {
        setSubmitted(true);
        setNotify(false);
        setFormState(undefined);
      });
    }
  }, [formState]);

  return (
    <Fragment>
      {submitted && (
        <SectionMessage title="Team Members Notified" appearance="confirmation">
          <Text>Email Notification Sent Successfully</Text>
        </SectionMessage>
      )}
      <Button
        text="Approve & Notify Team"
        icon="check-circle-outline"
        iconPosition="before"
        appearance="primary"
        onClick={notifyHandler}
      />
      {notify && (
        <Fragment>
          <Text>
            Send team member notification email about the {pollType}, enter team
            member emails, ensure to use <Strong>comma</Strong>for multiple
            emails
          </Text>
          <Form submitButtonAppearance="primary" onSubmit={onSubmit}>
            <TextArea
              name="teamEmail"
              label="Enter team emails"
              placeholder="Enter team member email,use comma for multiple emails"
            />
          </Form>
        </Fragment>
      )}
    </Fragment>
  );
}
