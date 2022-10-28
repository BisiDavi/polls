import ForgeUI, { Tabs, Tab } from "@forge/ui";

import PollChartTab from "./PollChartTab";
import PollStatisticsTab from "./PollStatisticsTab";

export default function ChartTabs({ data }) {
  const { pollData, regularChartData } = data;
  return (
    <Tabs>
      <Tab label="Poll Statistics">
        <PollStatisticsTab chartData={regularChartData} data={pollData} />
      </Tab>
      <Tab label="Bar Chart">
        <PollChartTab poll="bar" data={data} />
      </Tab>
      <Tab label="Pie Chart">
        <PollChartTab poll="pie" data={data} />
      </Tab>
      <Tab label="Polar Area Chart">
        <PollChartTab poll="polarArea" data={data} />
      </Tab>
    </Tabs>
  );
}
