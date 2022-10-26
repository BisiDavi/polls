import { getPollChartDataArray } from "./formatVote";
import generateRandomColor from "./generateRandomColor";

export default function getChartpollData(data, type) {
  const { pollOptions, title, pollData } = data;
  const chartData = getPollChartDataArray(pollOptions, pollData);
  return {
    type,
    data: {
      labels: pollOptions,
      datasets: [
        {
          label: title,
          data: chartData,
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
