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

export function formatPollAgenda(data: any, type: "agenda" | "poll") {
  const dataEntries = Object.entries(data);
  const topicsArray = [];
  dataEntries.map((item) => {
    if (item[0].includes(type)) {
      topicsArray.push(item[1]);
    }
  });
  return topicsArray;
}
