import ForgeUI, {
  Button,
  Em,
  Form,
  Fragment,
  Image,
  SectionMessage,
  Strong,
  Text,
  TextArea,
} from "@forge/ui";

import useNotifyTeam from "src/hooks/useNotifyTeam";

export default function NotifyTeam({ data }) {
  const { onSubmit, notify, submitted, pollType, notifyHandler } =
    useNotifyTeam(data);

  return (
    <Fragment>
      <Image
        src="https://res.cloudinary.com/verrb-inc/image/upload/v1666751407/Screenshot_2022-10-26_at_3.28.09_AM_oenkj6.png"
        alt="underline"
      />
      {submitted && (
        <SectionMessage title="Team Members Notified" appearance="confirmation">
          <Text>Email Notification Sent to Team, Successfully</Text>
        </SectionMessage>
      )}
      {!submitted && (
        <Button
          text="Approve & Notify Team"
          icon="check-circle-outline"
          iconPosition="before"
          appearance="primary"
          onClick={notifyHandler}
        />
      )}
      {notify && (
        <Fragment>
          <Text>
            <Em>
              Send team member notification email about the {pollType}, enter
              team member emails, ensure to use <Strong>comma</Strong> for
              multiple emails
            </Em>
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
