import { formatPollDate, isTimeValid } from "./isDateValid";

export default function formatPollTable(data: any[]) {
  const pollArray = [];
  data.map((item) => {
    const pollType =
      item.value.type === "meetingPoll" ? "Meeting Planning" : "Regular Poll";
    const status =
      item.value.type === "meetingPoll"
        ? isTimeValid(item.value.meetingDate)
        : isTimeValid(item.value.deadline);
    pollArray.push({
      rowId: item.value.title,
      title: item.value.title,
      author: item.value?.accountId,
      date: formatPollDate(item.value.date),
      sortDate: item.value.date,
      status,
      type: pollType,
      key: item.key,
    });
  });
  return pollArray;
}
