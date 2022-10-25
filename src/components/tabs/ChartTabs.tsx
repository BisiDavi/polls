import ForgeUI, { Tabs, Tab } from "@forge/ui";

import PollChartView from "../view/PollChartView";

export default function ChartTabs({ data }) {
  return (
    <Tabs>
      <Tab label="Bar Chart">
        <PollChartView data={data} poll="bar-chart" />
      </Tab>
      <Tab label="Pie Chart">
        <PollChartView data={data} poll="pie-chart" />
      </Tab>
      <Tab label="Polar Area Chart">
        <PollChartView data={data} poll="polar-area" />
      </Tab>
    </Tabs>
  );
}
