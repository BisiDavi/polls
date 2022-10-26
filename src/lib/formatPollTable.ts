import { formatPollDate } from "./isDateValid";

export default function formatPollTable(data: any[]) {
  const pollArray = [];
  data.map((item, index) => {
    const id = index + 1;
    const pollType =
      item.value.type === "meetingPoll" ? "Meeting Planning" : "Regular Poll";
    pollArray.push({
      title: `${id}.  ${item.value.title}`,
      author: item.value?.accountId,
      date: formatPollDate(item.value.date),
      type: pollType,
      pollStatus: "",
      key: item.key,
    });
  });
  return pollArray;
}
