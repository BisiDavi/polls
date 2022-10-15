import ForgeUI, { Text, Fragment, Heading, Button } from "@forge/ui";

export default function RegularPollView() {
  return (
    <Fragment>
      <Heading size="medium">Make Regular Polls</Heading>
      <Text>1. List Vote Options</Text>
      <Text>2. Customize Vote Option</Text>
      <Text>3. Publish Polls</Text>
      <Button
        text="Get Started with Regular Polls"
        icon="arrow-right"
        onClick={() => null}
        iconPosition="after"
      />
    </Fragment>
  );
}
 