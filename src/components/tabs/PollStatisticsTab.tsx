import ForgeUI, { Fragment, Text, Strong, Image, User } from "@forge/ui";

import { getVoteOptionCount } from "../../lib/formatVote";

export default function PollStatisticsTab({ data }) {
  const voteOptionData =
    data.length > 0 ? getVoteOptionCount(data[0].value) : null;

  return (
    <Fragment>
      {data[0].length > 0 && (
        <Fragment>
          <Text>
            <Strong>Number of Poll: </Strong>
            {data[0]?.value?.length} total votes
          </Text>
          <Image
            src="https://res.cloudinary.com/verrb-inc/image/upload/v1666751407/Screenshot_2022-10-26_at_3.28.09_AM_oenkj6.png"
            alt="underline"
          />
          <Fragment>
            {voteOptionData?.map((item) => {
              const voteText = item.count > 1 ? "votes" : "vote";
              const userGroup = Object.entries(item.user);
              const voteUserGroup = userGroup.filter(
                (userItem) => userItem[0] === item.vote
              );
              const voteUserGroupArray: any =
                voteUserGroup.length > 0 ? voteUserGroup[0][1] : [];
              const uniqueUser = new Set(voteUserGroupArray);
              const uniqueUserArray: any = Array.from(uniqueUser);
              return (
                <Fragment key={item.vote}>
                  <Text>
                    <Strong>{item.vote}:</Strong> {item.count} {voteText}
                  </Text>
                  <Text>
                    <Strong>Users:</Strong>
                    {uniqueUserArray?.map((item) => {
                      const voteCount = voteUserGroupArray.filter(
                        (voteItem) => voteItem === item
                      ).length;
                      return (
                        <Fragment key={item}>
                          <User accountId={item} />({voteCount})
                        </Fragment>
                      );
                    })}
                  </Text>
                  <Image
                    src="https://res.cloudinary.com/verrb-inc/image/upload/v1666751407/Screenshot_2022-10-26_at_3.28.09_AM_oenkj6.png"
                    alt="underline"
                  />
                </Fragment>
              );
            })}
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
}
