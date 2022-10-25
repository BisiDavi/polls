import ForgeUI, {
  Fragment,
  useState,
  Select,
  Option,
  Form,
  Image,
} from "@forge/ui";

const chartTypeArray = [
  { text: "Bar", value: "bar" },
  { text: "Pie Chart", value: "pie" },
  { text: "Doughtnut", value: "doughtnut" },
  { text: "Polar Area", value: "polarArea" },
];

export default function PollChartView({ pollOptions, poll }) {
  const [formState, setFormState] = useState(undefined);
  async function onSubmit(formData) {
    formData: {
      chartType: "";
    }
    setFormState(formData);
  }

  console.log("formState", formState);

  return (
    <Fragment>
      <Form submitButtonText="Submit Chart Type" onSubmit={onSubmit}>
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
      {formState && <Image src="/" alt={`${formState} chart`} />}
    </Fragment>
  );
}
