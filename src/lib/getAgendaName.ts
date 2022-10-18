export function getAgendaName(item: string, index: number) {
  const agendaCount = index + 1;
  const itemSplit = item.split(" ")[0].toLowerCase();
  const name = `${itemSplit}-${agendaCount}`;
  return { agendaCount, name };
}

export function formatFormPoll(pollState) {
  const agendaObj = {};
  pollState.map((item, index) => {
    const { name } = getAgendaName(item, index);
    agendaObj[name] = "";
  });

  return agendaObj;
}

export function formatPollTopic(data: any) {
  const dataEntries = Object.entries(data);
  const topicsArray = [];
  dataEntries.map((item) => {
    if (item[0].includes("topic")) {
      topicsArray.push(item[1]);
    }
  });
  return topicsArray;
}
