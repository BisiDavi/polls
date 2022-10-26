import ForgeUI, { Fragment, Text, Strong, Image, User } from "@forge/ui";

import { getVoteOptionCount } from "../../lib/formatVote";

export default function PollDetailsTab({ data }) {
  console.log("data-value", data[0]?.value);

  const voteOptionData =
    data.length > 0 ? getVoteOptionCount(data[0].value) : null;

  return (
    <Fragment>
      <Text>
        <Strong>Poll Statistics</Strong>
      </Text>
      <Text>Number of Poll: {data[0]?.value?.length}</Text>
      <Fragment>
        {voteOptionData.map((item) => {
          const voteText = item.count > 1 ? "votes" : "vote";
          const userGroup = Object.entries(item.user);
          const voteUserGroup = userGroup.filter(
            (userItem) => userItem[0] === item.vote
          );
          const voteUserGroupArray: any =
            voteUserGroup.length > 0 ? voteUserGroup[0][1] : [];
          console.log("voteUserGroup", voteUserGroup);
          return (
            <Fragment key={item.vote}>
              <Text>
                <Strong>{item.vote}</Strong>: {item.count} {voteText}
              </Text>
              <Image
                src="https://res.cloudinary.com/verrb-inc/image/upload/v1666749584/Screenshot_2022-10-26_at_2.56.21_AM_uupli4.png"
                alt="underline"
              />
              <Text>
                <Strong>Users:</Strong>:({voteUserGroupArray.length}){" "}
                {voteUserGroupArray.map((item) => (
                  <User accountId={item} />
                ))}
              </Text>
            </Fragment>
          );
        })}
      </Fragment>
    </Fragment>
  );
}
