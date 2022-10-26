import ForgeUI, { Fragment, Image, Text } from "@forge/ui";

import getChartData from "../../lib/getChartData";

export default function PollChartTab({ data, poll }) {
  const chartData = getChartData(data, poll);
  console.log("PollChartTab-chartData", chartData);
  console.log(
    `PollChartTab-chartData[dataset]-${poll}`,
    chartData.data.datasets
  );
  const chartLink = `https://quickchart.io/chart?c=${encodeURI(
    `${chartData}`
  )}`;
  console.log("chartLink", chartLink);
  return (
    <Fragment>
      <Text>{chartLink}</Text>
      <Image src={chartLink} alt={`${poll} chart`} />
    </Fragment>
  );
}
