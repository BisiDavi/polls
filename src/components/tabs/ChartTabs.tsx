import ForgeUI, { Tabs, Tab } from "@forge/ui";

import PollChartTab from "./PollChartTab";
import PollStatisticsTab from "./PollStatisticsTab";

export default function ChartTabs({ data, pollOptions }) {
  return (
    <Tabs>
      <Tab label="Poll Statistics">
        <PollStatisticsTab data={data} />
      </Tab>
      <Tab label="Bar Chart">
        <PollChartTab poll="bar" data={data} pollOptions={pollOptions} />
      </Tab>
      <Tab label="Pie Chart">
        <PollChartTab poll="pie" data={data} pollOptions={pollOptions} />
      </Tab>
      <Tab label="Polar Area Chart">
        <PollChartTab poll="polar-area" data={data} pollOptions={pollOptions} />
      </Tab>
    </Tabs>
  );
}
