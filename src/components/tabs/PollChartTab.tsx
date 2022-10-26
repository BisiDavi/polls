import ForgeUI, { Fragment, Image } from "@forge/ui";

import getChartData from "../../lib/getChartData";

export default function PollChartTab({ data, poll }) {
  const chartData = getChartData(data, poll);
  return (
    <Fragment>
      <Image src="/" alt={`${poll} chart`} />
    </Fragment>
  );
}
