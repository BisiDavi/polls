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
  const usersObj = {};

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

export function getPollChartDataArray(pollOptions, data) {
  const result = [];
  if (data[0]) {
    pollOptions.map((item) => {
      const resultCount = data[0].value.filter(
        (dataItem) => dataItem.vote === item
      ).length;
      result.push({ vote: item, count: resultCount });
    });
  }
  return result;
}
