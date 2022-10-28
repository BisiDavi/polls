import ForgeUI, {
  Form,
  useState,
  TextField,
  Heading,
  TextArea,
  Fragment,
  CheckboxGroup,
  Checkbox,
} from "@forge/ui";

import { formatFormPoll } from "../../lib/getAgendaName";
import PollsFieldSet from "./PollsFieldSet";

export default function RegularPollForm({ onSubmit }) {
  const [regularPolls, setRegularPolls] = useState(["Poll Option 1"]);

  const pollObj = formatFormPoll(regularPolls);

  return (
    <Fragment>
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
        <PollsFieldSet
          type="regular"
          poll={regularPolls}
          setPoll={setRegularPolls}
        />
      </Form>
    </Fragment>
  );
}
