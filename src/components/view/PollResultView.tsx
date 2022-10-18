import ForgeUI, { Text, Fragment, Heading, Button } from "@forge/ui";

export default function PollResultView({ data }) {
  console.log("meetingFormData-polls", data);

  return (
    <Fragment>
      <Heading size="medium">Polls Details </Heading>
      <Text>View Polls</Text>

      <Button
        text="Publish"
        icon="arrow-right"
        iconPosition="after"
        onClick={() => null}
      />
    </Fragment>
  );
}
