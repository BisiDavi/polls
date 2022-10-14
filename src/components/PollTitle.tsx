import ForgeUI, {
  Text,
  Fragment,
  useState,
  Button,
  TextField,
  Form,
  Tooltip,
} from "@forge/ui";

export default function PollTitle() {
  const [formState, setFormState] = useState(undefined);
  const [edit, setEdit] = useState(false);

  const onSubmit = async (formData) => {
    formData: {
      title: "";
    }
    setFormState(formData);
    setEdit(false);
  };

  return (
    <Fragment>
      {!edit ? (
        formState && <Text>{formState.title}</Text>
      ) : (
        <Form onSubmit={onSubmit}>
          <TextField
            label=""
            type="text"
            name="title"
            placeholder="Set Poll Title"
          />
        </Form>
      )}
      <Button text="" onClick={() => setEdit(true)} icon="edit" />
      <Tooltip text="Create New Poll">
        <Button icon="add" text="" onClick={() => null} />
      </Tooltip>
    </Fragment>
  );
}
