import ForgeUI, {
  Fragment,
  Text,
  Em,
  Button,
  useState,
  Select,
  Option,
  Form,
} from "@forge/ui";

const chartTypeArray = [
  { text: "Bar", value: "bar" },
  { text: "Pie Chart", value: "pie" },
  { text: "Doughtnut", value: "doughtnut" },
  { text: "Line", value: "line" },
  { text: "Polar Area", value: "polarArea" },
];

export default function PollChartView() {
                                                                                                  async function onSubmit(formData) {
    formData: {
      chartType: "";
    }
  }

  return (
    <Form submitButtonText="Submit Chart Type" onSubmit={() => null}>
      <Select label="Change Chart Type" name="chartType">
        {chartTypeArray.map((item) => {
          const defaultSelected = item.value === "bar" ? true : false;
          return (
            <Option
              defaultSelected={defaultSelected}
              label={item.text}
              value={item.value}
            />
          );
        })}
      </Select>
    </Form>
  );
}
