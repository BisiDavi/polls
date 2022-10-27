import ForgeUI, {
  Button,
  ButtonSet,
  useEffect,
  Fragment,
  useState,
} from "@forge/ui";


export default function MeetingLink({}) {
  const [meetingLink, setMeetingLink] = useState(null);

  useEffect(() => {
		if(meetingLink === "generate-zoom-link"){

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
    </Fragment>
  );
}
