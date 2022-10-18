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

export default function RegularPollForm({ actionButton }: any) {
  const [formState, setFormState] = useState(undefined);
  const [regularPolls, setRegularPolls] = useState(["Poll Option 1"]);
  const [regularFormData, setRegularFormData] = useContentProperty(
    "regularFormData",
    ""
  );
  console.log("formState", formState);
  const date = new Date();

  console.log("regularFormData-RegularPollForm", regularFormData);

  const onSubmit = async (formData) => {
    const pollObj = formatFormPoll(regularPolls);
    formData: {
      title: "";
      link: "";
      description: "";
    }
    setFormState({
      ...pollObj,
      ...formData,
      type: "regularMeetingPoll",
      date: date.toISOString(),
    });
  };
  return (
    <Fragment>
      {regularFormData ? (
        <PollResultView data={regularFormData} />
      ) : (
        <Form
          submitButtonAppearance="primary"
          actionButtons={actionButton}
          onSubmit={onSubmit}
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
