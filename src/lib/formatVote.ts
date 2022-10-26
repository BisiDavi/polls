type voteType = Array<{ date: string; author: string; vote: string }>;

export function getUniqueVoteOptions(votes: voteType) {
  const voteOptions = [];
  votes.map((item) => voteOptions.push(item.vote));
  const uniqueVoteOptionsObj = new Set(voteOptions);
  const uniqueVoteOptions = Array.from(uniqueVoteOptionsObj);
  return uniqueVoteOptions;
}

export function getVoteOptionCount(votes: voteType) {
  console.log("votes", votes);
  const uniqueVotes = getUniqueVoteOptions(votes);
  const voteCount = [];
  const usersObj = {};

  console.log("uniqueVotes", uniqueVotes);

  uniqueVotes.map((voteItem) => {
    const filteredVote = votes.filter((item) => item.vote === voteItem);
    usersObj[voteItem] = [];
    filteredVote.map((item) => usersObj[voteItem].push(item.author));
    const data = {
      vote: voteItem,
      user: usersObj,
      count: filteredVote.length,
    };
    voteCount.push(data);
  });
  return voteCount;
}
