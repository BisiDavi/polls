import ForgeUI, {
  Button,
  ButtonSet,
  useEffect,
  Fragment,
  TextField,
  Form,
} from "@forge/ui";

export default function MeetingLink({
  meetingLink,
  setFormState,
  setMeetingLink,
}) {
  async function onSubmit(formData) {
    formData: {
      link: "";
    }
    setFormState({
      ...formData,
    });
  }

  useEffect(() => {
    if (meetingLink === "generate-zoom-link") {
    }
  }, []);

  return (
    <Fragment>
      <ButtonSet>
        {meetingLink === null && (
          <Fragment>
            <Button
              text="Generate zoom meeting link"
              icon="link"
              iconPosition="before"
              appearance="primary"
              onClick={() => setMeetingLink("generate-zoom-link")}
            />
            <Button
              text="Or Enter a meeting link"
              icon="add"
              appearance="warning"
              onClick={() => setMeetingLink("enter-meeting-link")}
            />
          </Fragment>
        )}
        {meetingLink && (
          <Button
            text="Reset"
            icon="error"
            appearance="danger"
            onClick={() => null}
          />
        )}
      </ButtonSet>
      {meetingLink === "enter-meeting-link" && (
        <Form
          submitButtonAppearance="primary"
          submitButtonText="Submit Link"
          onSubmit={onSubmit}
        >
          <TextField
            name="link"
            label="Meeting Link"
            placeholder="Enter meeting link (zoom/google meet or any)"
            isRequired
          />
        </Form>
      )}
    </Fragment>
  );
}
