import ForgeUI, {
  Form,
  useState,
  TextField,
  Heading,
  TextArea,
  Fragment,
} from "@forge/ui";

import PollsFieldSet from "./PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";
import PollResultView from "../view/PollResultView";
import useRegularPollForm from "../../hooks/useRegularPollForm";

export default function RegularPollForm({ setPollResult }) {
  const [formState, setFormState] = useState(undefined);
  const [regularPolls, setRegularPolls] = useState(["Poll Option 1"]);
  const { onSubmit, regularFormData } = useRegularPollForm(
    formState,
    setFormState,
    setPollResult
  );

  const pollObj = formatFormPoll(regularPolls);
  console.log("regularFormData-RegularPollForm", regularFormData);
  console.log("pollObj", pollObj);

  return (
    <Fragment>
      {regularFormData ? (
        <PollResultView data={regularFormData} />
      ) : (
        <Form
          submitButtonAppearance="primary"
          onSubmit={(data) => onSubmit(data, pollObj)}
        >
          <Heading>Regular Poll Form</Heading>
          <TextField name="title" label="Poll Title" isRequired />
          <TextArea spellCheck label="Poll Description" name="description" />

          <PollsFieldSet
            type="regular"
            poll={regularPolls}
            setPoll={setRegularPolls}
          />
        </Form>
      )}
    </Fragment>
  );
}
