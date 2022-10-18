import ForgeUI, {
  Fragment,
  Heading,
  useState,
  ModalDialog,
  Button,
  ButtonSet,
} from "@forge/ui";

export default function Layout({ children, form }) {
  const [isOpen, setOpen] = useState(true);
  const [pollType, setPollType] = useState("");

  return (
    <Fragment>
      {isOpen && (
        <ModalDialog header="Workspace Polls" onClose={() => setOpen(false)}>
          <Heading>Welcome to Polls, plan your meeting succintly.</Heading>
          {pollType === "" ? children : form}
          <ButtonSet>
            <Button
              text="Back"
              icon="arrow-left"
              onClick={() => setPollType("")}
            />
            <Button
              text="Cancel"
              icon="error"
              appearance="danger"
              onClick={() => setOpen(false)}
            />
          </ButtonSet>
        </ModalDialog>
      )}
    </Fragment>
  );
}
