import { getPollChartDataArray } from "./formatVote";
import generateRandomColor from "./generateRandomColor";

export default function getChartpollData(data, type) {
  const { pollOptions, title, pollData } = data;
  const chartData = getPollChartDataArray(pollOptions, pollData);
  const barChartDataset = [];
  pollOptions.map((item) => {
    const dataCount = chartData.filter((d) => d.vote === item)[0];
    barChartDataset.push({
      label: item,
      data: dataCount ? [dataCount.count] : [0],
      backgroundColor: generateRandomColor(),
    });
  });
  return {
    type,
    data: {
      labels: pollOptions,
      datasets: barChartDataset,
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
