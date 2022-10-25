import generateRandomColor from "./generateRandomColor";

export default function chartData(data, type) {
  const chartObj = {
    type,
    data: {
      labels: data.labels,
      datasets: [
        {
          label: data.label,
          data: data.chartData,
          backgroundColor: generateRandomColor(),
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: data.title,
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
