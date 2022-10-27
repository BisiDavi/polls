export function getSuggestedAgenda(agenda, dataKey) {
  const suggestedAgenda = [];
  const filterSuggestedAgendas =
    agenda.length > 0
      ? agenda.filter((item) => item.key.includes(dataKey))
      : [];
  filterSuggestedAgendas.map((item) => {
    suggestedAgenda.push(...item.value);
  });
  return suggestedAgenda;
}

export function formatAgendaDate(dateString) {
  const dateInstance = new Date(dateString);
  return dateInstance.toLocaleString("en-US", {
    hour12: true,
  });
}
