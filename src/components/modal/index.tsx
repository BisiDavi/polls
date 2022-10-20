import ForgeUI, { Fragment, ModalDialog, useState, useEffect } from "@forge/ui";
import { useContentProperty } from "@forge/ui-confluence";

export default function Layout({ children, goBack, type }) {
  const [modal, setModal] = useContentProperty("modal", true);
  const [modalState, setModalState] = useState(true);

  useEffect(() => {
    console.log("modalstate-useeffect", modalState);
    console.log("modal-useeffect", modal);
    setModalState(modal);
  }, [modal]);

  async function modalHandler() {
    setModalState(false);
    await setModal(false);
  }

  console.log("modal", modal);
  console.log("modalState", modalState);

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
