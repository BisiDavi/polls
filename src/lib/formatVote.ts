type voteType = Array<{ date: string; author: string; vote: string }>;

export function getUniqueVoteOptions(votes: voteType) {
  const voteOptions = [];
  votes.map((item) => voteOptions.push(item.vote));
  const uniqueVoteOptionsObj = new Set(voteOptions);
  const uniqueVoteOptions = Array.from(uniqueVoteOptionsObj);
  return uniqueVoteOptions;
}

export function getVoteOptionCount(votes: voteType) {
  const uniqueVotes = getUniqueVoteOptions(votes);
  const voteCount = [];
  const users = [];

  uniqueVotes.map((voteItem) => {
    const filteredVote = votes.filter((item) => item.vote === voteItem);
    const voteAuthor = filteredVote.map((item) => users.push(item.author));
    const data = {
      vote: voteItem,
      user: voteAuthor,
      count: filteredVote.length,
    };
    voteCount.push(data);
  });
  return voteCount;
}
