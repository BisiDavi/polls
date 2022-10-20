import ForgeUI, { Fragment, ModalDialog, useState, useEffect } from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

export default function Layout({ children, goBack, type }) {
  const [modal, setModal] = useContentProperty("modal", true);
  const [modalState, setModalState] = useState(true);

  useEffect(() => {
    setModalState(modal);
  }, [modal]);

  async function modalHandler() {
    await setModal(false);
  }

  console.log("modal", modal);

  return (
    <Fragment>
      {modalState && (
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
