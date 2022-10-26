import ForgeUI, { Text, Fragment, Heading, Button } from "@forge/ui";

import pollContent from "../../json/pollview.json";

export default function RegularPollView({ setPollType }) {
  function buttonHandler() {
    setPollType("Regular");
  }

  return (
    <Fragment>
      <Heading size="small">Make Regular Polls</Heading>
      {pollContent.regular.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
      <Button
        text="Get Started with Polls"
        icon="arrow-right"
        iconPosition="after"
        onClick={buttonHandler}
      />
    </Fragment>
  );
}
