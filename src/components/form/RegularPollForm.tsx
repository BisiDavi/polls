import ForgeUI, {
  Form,
  useState,
  TextField,
  Heading,
  TextArea,
  CheckboxGroup,
  Checkbox,
  Select,
  Option,
} from "@forge/ui";

import { formatFormPoll } from "../../lib/getAgendaName";
import PollsFieldSet from "./PollsFieldSet";

export default function RegularPollForm({ onSubmit }) {
  const [regularPolls, setRegularPolls] = useState(["Poll Option 1"]);
  
  const pollObj = formatFormPoll(regularPolls);
  const pollDurationOption = [
    { label: "1 hr", value: 1 },
    { label: "3 hrs", value: 3 },
    { label: "6 hrs", value: 6 },
    { label: "12 hrs", value: 12 },
    { label: "24 hrs", value: 24 },
  ];

  return (
    <Form
      submitButtonAppearance="primary"
      onSubmit={(data) => onSubmit(data, pollObj)}
    >
      <Heading>Regular Poll Form</Heading>
      <TextField name="title" label="Poll Title" isRequired />
      <TextArea spellCheck label="Poll Description" name="description" />
      <CheckboxGroup label="Make Poll Voters Anonymous" name="hideVoters">
        <Checkbox value="true" label="Yes" />
        <Checkbox value="false" label="No" />
      </CheckboxGroup>
      <Select label="Select Poll Duration" name="duration" isRequired>
        {pollDurationOption.map((item) => (
          <Option key={item.label} label={item.label} value={item.value} />
        ))}
      </Select>
      <TextField
        name="authorEmail"
        label="Enter your Email"
        placeholder="receive notification about the poll activities"
        type="email"
        isRequired
      />
      <PollsFieldSet
        type="regular"
        poll={regularPolls}
        setPoll={setRegularPolls}
      />
      <TextArea
        label="Notify Team about the Poll (enter team members email, separate with comma"
        placeholder="Enter team members email, separate with comma"
        name="team"
        isRequired
      />
    </Form>
  );
}
