import ForgeUI, { Text, Fragment, Heading, Button } from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

export default function PollResultView() {
  const [pollFormData, setpollFormData] = useContentProperty(
    "pollFormData",
    ""
  );

  console.log("meetingFormData-polls", pollFormData);

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
