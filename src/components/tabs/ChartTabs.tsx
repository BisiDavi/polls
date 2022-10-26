import ForgeUI, { Tabs, Tab } from "@forge/ui";

import PollChartTab from "./PollChartTab";
import PollDetailsTab from "./PollDetailsTab";

export default function ChartTabs({ data }) {
  return (
    <Tabs>
      <Tab label="Poll Statistics">
        <PollDetailsTab data={data} />
      </Tab>
      <Tab label="Bar Chart">
        <PollChartTab data={data} poll="bar-chart" />
      </Tab>
      <Tab label="Pie Chart">
        <PollChartTab data={data} poll="pie-chart" />
      </Tab>
      <Tab label="Polar Area Chart">
        <PollChartTab data={data} poll="polar-area" />
      </Tab>
    </Tabs>
  );
}
