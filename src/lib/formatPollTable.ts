import { formatPollDate } from "./isDateValid";

export default function formatPollTable(data: any[]) {
  const pollArray = [];
  data.map((item) => {
    const pollType =
      item.value.type === "meetingPoll" ? "Meeting Planning" : "Regular Poll";
    pollArray.push({
      rowId: item.value.title,
      title: item.value.title,
      author: item.value?.accountId,
      date: formatPollDate(item.value.date),
      sortDate: item.value.date,
      type: pollType,
      key: item.key,
    });
  });
  return pollArray;
}
