import ForgeUI, { Fragment, Heading, useState, ModalDialog } from "@forge/ui";

export default function Layout({ children, goBack, type }) {
  const [isOpen, setOpen] = useState(true);

  return (
    <Fragment>
      {isOpen && (
        <ModalDialog header="Workspace Polls" onClose={() => setOpen(false)}>
          <Heading>Welcome to Polls, plan your meeting succintly.</Heading>
          {children}
          {type !== "" && goBack}
        </ModalDialog>
      )}
    </Fragment>
  );
}
