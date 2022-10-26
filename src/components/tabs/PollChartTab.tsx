import ForgeUI, { Fragment, Image } from "@forge/ui";

import getChartData from "../../lib/getChartData";

export default function PollChartTab({ data, poll }) {
  const chartData = getChartData(data, poll);
  console.log("PollChartTab-chartData", chartData);
  console.log(
    `PollChartTab-chartData[dataset]-${poll}`,
    chartData.data.datasets
  );
  const stringifyChartData = JSON.stringify(chartData);
  const encodedURI = encodeURIComponent(stringifyChartData);
  const chartLink = `https://quickchart.io/chart?c=${encodedURI}`;
  console.log("chartLink", chartLink);
  return (
    <Fragment>
      <Image src={chartLink} alt={`${poll} chart`} />
    </Fragment>
  );
}
