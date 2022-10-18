import ForgeUI, {
  Fragment,
  Heading,
  useState,
  ModalDialog,
  Button,
  ButtonSet,
} from "@forge/ui";

export default function Layout({ children, goBack }) {
  const [isOpen, setOpen] = useState(true);

  return (
    <Fragment>
      {isOpen && (
        <ModalDialog header="Workspace Polls" onClose={() => setOpen(false)}>
          <Heading>Welcome to Polls, plan your meeting succintly.</Heading>
          {children}
          <ButtonSet>
            {goBack}
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
