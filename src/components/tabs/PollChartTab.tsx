import ForgeUI, { Fragment, Image } from "@forge/ui";

export default function PollChartTab({ data, poll }) {
  return (
    <Fragment>
      <Image src="/" alt={`${poll} chart`} />
    </Fragment>
  );
}
