import ForgeUI, {
  Fragment,
  Text,
  Strong,
  Image,
  User,
  UserGroup,
} from "@forge/ui";

import { getVoteOptionCount } from "../../lib/formatVote";

export default function PollStatisticsTab({ data, chartData }) {
  const voteOptionData =
    data.length > 0 ? getVoteOptionCount(data[0].value) : null;

  console.log("data.hideVoters", chartData?.hideVoters);

  return (
    <Fragment>
      {data.length > 0 && (
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
                  {chartData?.hideVoters[0] === "false" && (
                    <Text>
                      <Strong>User(s): </Strong>
                      {uniqueUserArray?.map((item) => (
                        <UserGroup key={item}>
                          <User accountId={item} />
                        </UserGroup>
                      ))}
                    </Text>
                  )}
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
