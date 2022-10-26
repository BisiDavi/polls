import { formatPollDate } from "./isDateValid";

export default function formatPollTable(data: any[]) {
  const pollArray = [];
  data.map((item, index) => {
    const id = index + 1;
    const pollType =
      item.value.type === "meetingPoll" ? "Meeting Planning" : "Regular Poll";
    pollArray.push({
      rowId: item.value.title,
      title: `${id}.  ${item.value.title}`,
      author: item.value?.accountId,
      date: formatPollDate(item.value.date),
      type: pollType,
      key: item.key,
    });
  });
  return pollArray;
}
