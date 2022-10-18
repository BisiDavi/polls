import ForgeUI, {
  Form,
  useState,
  TextField,
  Heading,
  TextArea,
  Fragment,
} from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

import PollsFieldSet from "./PollsFieldSet";
import { formatFormPoll } from "../../lib/getAgendaName";
import PollResultView from "../view/PollResultView";
import useRegularPollForm from "../../hooks/useRegularPollForm";

export default function RegularPollForm() {
  const [formState, setFormState] = useState(undefined);
  const [regularPolls, setRegularPolls] = useState(["Poll Option 1"]);
  const { onSubmit } = useRegularPollForm(setFormState);
  const [regularFormData, setRegularFormData] = useContentProperty(
    "regularFormData",
    ""
  );
  console.log("formState", formState);

  console.log("regularFormData-RegularPollForm", regularFormData);

  const pollObj = formatFormPoll(regularPolls);

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
