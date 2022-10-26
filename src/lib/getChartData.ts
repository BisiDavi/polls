import { getPollChartDataArray } from "./formatVote";
import generateRandomColor from "./generateRandomColor";

function pieChart(pollOptions, chartData) {
  const data = [];
  const backgroundColor = [];
  chartData.map((item) => data.push(item.count));
  pollOptions.map((_) => {
    const randomColor = generateRandomColor();
    backgroundColor.push(randomColor);
  });
  const pieChartDataset = [{ data, backgroundColor, label: "" }];
  return pieChartDataset;
}

function barChart(pollOptions, chartData) {
  const barChartDataset = [];
  pollOptions.map((item) => {
    const dataCount = chartData.filter((d) => d.vote === item)[0];
    barChartDataset.push({
      label: item,
      data: dataCount ? [dataCount.count] : [0],
      backgroundColor: generateRandomColor(),
    });
  });
}

export default function getChartpollData(data, type) {
  const { pollOptions, title, pollData } = data;
  const chartData = getPollChartDataArray(pollOptions, pollData);
  const barChartDataset = barChart(pollOptions, chartData);
  const pieChartDataset = pieChart(pollOptions, chartData);
  const polarAreaLegend = {
    legend: {
      position: "right",
    },
  };
  const legend = type === "polar-area" ? polarAreaLegend : "";

  return {
    type,
    data: {
      labels: pollOptions,
      datasets: type === "bar" ? barChartDataset : pieChartDataset,
    },
    options: {
      ...legend,
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
