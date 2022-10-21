import ForgeUI, { Fragment, ModalDialog, useState } from "@forge/ui";

export default function Modal({ children, goBack, type }) {
  const [modalState, setModalState] = useState(false);

  function modalHandler() {
    setModalState(false);
  }

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
