import ForgeUI, {
  Button,
  ButtonSet,
  useEffect,
  Fragment,
  TextField,
  Form,
  useState,
} from "@forge/ui";
import { fetch } from "@forge/api";

import { formatPollAgenda } from "../../lib/getAgendaName";

export default function MeetingLink({ data, setFormState, setMeetingLink }) {
  const [meetingType, setMeetingType] = useState(null);

  async function onSubmit(formData) {
    formData: {
      link: "";
    }
    setFormState({
      ...formData,
    });
  }

  useEffect(async () => {
    if (meetingType === "generate-zoom-link") {
      const agendas = data ? formatPollAgenda(data, "agenda") : null;
      let agendaString = "";
      agendas.map((item) => {
        agendaString += `${item} \n`;
      });
      console.log("agendaString", agendaString);

      await fetch("https://confluence-api.vercel.app/api/zoom/create-meeting", {
        method: "POST",
        body: JSON.stringify({
          topic: data.title,
          agenda: agendaString,
        }),
      }).then((response) => {
        const result = response.json();
        console.log("zoom-api-response", result);
        setMeetingLink(result);
      });
    }
  }, [meetingType]);

  const disableZoomBtn = meetingType === "generate-zoom-link" ? true : false;
  const disableMeetingLinkBtn =
    meetingType === "enter-meeting-link" ? true : false;

  return (
    <Fragment>
      <ButtonSet>
        <Fragment>
          <Button
            text="Generate zoom meeting link"
            icon="link"
            iconPosition="before"
            appearance="primary"
            disabled={disableZoomBtn}
            onClick={() => setMeetingType("generate-zoom-link")}
          />
          <Button
            text="Or Enter a meeting link"
            icon="add"
            appearance="warning"
            disabled={disableMeetingLinkBtn}
            onClick={() => setMeetingType("enter-meeting-link")}
          />
        </Fragment>
        {meetingType && (
          <Button
            text="Reset"
            icon="error"
            appearance="danger"
            onClick={() => setMeetingType(null)}
          />
        )}
      </ButtonSet>
      {meetingType === "enter-meeting-link" && (
        <Form
          submitButtonAppearance="primary"
          submitButtonText="Submit Link"
          onSubmit={onSubmit}
        >
          <TextField
            name="link"
            label="Meeting Link"
            placeholder="Enter a meeting link (zoom/google meet or any video call platform link)"
            isRequired
          />
        </Form>
      )}
    </Fragment>
  );
}
