import ForgeUI, { Fragment, Image } from "@forge/ui";

import getChartData from "../../lib/getChartData";

export default function PollChartTab({ data, poll }) {
  const chartData = getChartData(data, poll);
  console.log("PollChartTab-chartData", chartData);
  console.log(`PollChartTab-chartData[dataset]-${poll}`, chartData.data.datasets);
  const chartLink = `https://quickchart.io/chart?c=${chartData}`;
  console.log("chartLink", chartLink);
  return (
    <Fragment>
      <Image
        src={`https://quickchart.io/chart?c=${chartData}`}
        alt={`${poll} chart`}
      />
    </Fragment>
  );
}
