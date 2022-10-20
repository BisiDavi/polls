import ForgeUI, { Fragment, Heading, ModalDialog } from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

export default function Layout({ children, goBack, type }) {
  const [modal, setModal] = useContentProperty("modal", true);

  async function modalHandler() {
    await setModal(false);
  }

  return (
    <Fragment>
      {modal && (
        <ModalDialog
          header="Welcome to Polls, plan your meeting succintly."
          onClose={modalHandler}
        >
          {children}
          {type !== "" && goBack}
        </ModalDialog>
      )}
    </Fragment>
  );
}
