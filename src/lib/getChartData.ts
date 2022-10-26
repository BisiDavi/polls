import { getPollChartDataArray } from "./formatVote";
import generateRandomColor from "./generateRandomColor";

export default function getChartpollData(data, type) {
  const { pollOptions, title, pollData } = data;
  console.log("pollOptions", pollOptions);
  console.log("data", data);
  const chartData = getPollChartDataArray(pollOptions, pollData);
  console.log("chartData", chartData);
  return {
    type,
    data: {
      labels: pollOptions,
      datasets: [
        {
          label: title,
          data: [],
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
