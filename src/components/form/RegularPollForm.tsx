import ForgeUI, {
  Form,
  useState,
  TextField,
  Heading,
  TextArea,
  Fragment,
} from "@forge/ui";

import { formatFormPoll } from "../../lib/getAgendaName";
import useRegularPollForm from "../../hooks/useRegularPollForm";
import PollResultView from "../view/PollResultView";
import PollsFieldSet from "./PollsFieldSet";

export default function RegularPollForm({ viewType, setPollType, appPoll }) {
  const [formState, setFormState] = useState(undefined);
  const [regularPolls, setRegularPolls] = useState(["Poll Option 1"]);
  const { onSubmit, regularFormData } = useRegularPollForm(
    formState,
    setFormState,
    setPollType
  );

  const pollObj = formatFormPoll(regularPolls);

  return (
    <Fragment>
      {viewType === "Regular-View" ? (
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
