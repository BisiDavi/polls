import ForgeUI, { Fragment, Image } from "@forge/ui";

import getChartpollData from "../../lib/getChartData";

export default function PollChartTab({ data, poll }) {
  const chartData = getChartpollData(data, poll);
  const stringifyChartData = JSON.stringify(chartData);
  const encodedURI = encodeURIComponent(stringifyChartData);
  const chartLink = `https://quickchart.io/chart?c=${encodedURI}`;
  return (
    <Fragment>
      <Image src={chartLink} alt={`${poll} chart`} />
    </Fragment>
  );
}
