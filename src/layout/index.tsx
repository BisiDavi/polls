import ForgeUI, { Fragment, Heading, ModalDialog } from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

export default function Layout({ children, goBack, type }) {
  const [modal, setModal] = useContentProperty("modal", true);

  console.log("modal", modal);

  async function modalHandler() {
    await setModal(false);
  }

  return (
    <Fragment>
      {modal && (
        <ModalDialog header="Workspace Polls" onClose={modalHandler}>
          <Heading>Welcome to Polls, plan your meeting succintly.</Heading>
          {children}
          {type !== "" && goBack}
        </ModalDialog>
      )}
    </Fragment>
  );
}
