import ForgeUI, { Text, Fragment, Heading, Button } from "@forge/ui";

import pollContent from "../json/pollview.json";

export default function RegularPollView({ setPollType }) {
  return (
    <Fragment>
      <Heading size="medium">Make Regular Polls</Heading>
      {pollContent.regular.map((item) => (
        <Text key={item}>{item}</Text>
      ))}

      <Button
        text="Get Started with Regular Polls"
        icon="arrow-right"
        iconPosition="after"
        onClick={() => setPollType("Regular")}
      />
    </Fragment>
  );
}
