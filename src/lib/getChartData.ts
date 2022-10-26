import generateRandomColor from "./generateRandomColor";

export default function getChartpollData(data, type) {
  const { pollOptions, title, pollData } = data;
  return {
    type,
    data: {
      labels: pollOptions,
      datasets: [
        {
          label: title,
          data: pollData.chartpollData,
          backgroundColor: generateRandomColor(),
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: title,
      },
      plugins: {
        datalabels: {
          anchor: "center",
          align: "center",
          color: "#666",
          font: {
            weight: "normal",
          },
        },
      },
    },
  };
}
