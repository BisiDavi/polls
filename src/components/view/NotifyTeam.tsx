import ForgeUI, {
  Button,
  Form,
  Fragment,
  Strong,
  Text,
  TextArea,
  useEffect,
  useState,
} from "@forge/ui";
import { fetch } from "@forge/api";

export default function NotifyTeam({ data }) {
  const [notify, setNotify] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState(undefined);

  async function onSubmit(formData) {
    formData: {
      teamEmail: "";
    }
    setFormState(formData);
  }

  console.log("formState", formState);

  useEffect(async () => {
    if (formState !== undefined && !submitted) {
      await fetch("https://confluence-api.vercel.app/api/gmail/mail/send", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          receipent: formState.teamEmail,
          message: "",
        }),
      }).then((response) => {
        setSubmitted(true);
        setNotify(false);
      });
      const messageData = {};
    }
  }, [formState]);

  return (
    <Fragment>
      <Button
        text="Approve & Notify Team"
        icon="check-circle-outline"
        iconPosition="before"
        appearance="primary"
        onClick={() => setNotify(true)}
      />
      {notify && (
        <Fragment>
          <Text>
            Enter Team member emails, ensure to use <Strong>comma</Strong>for
            multiple email
          </Text>
          <Form submitButtonAppearance="primary" onSubmit={() => null}>
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
