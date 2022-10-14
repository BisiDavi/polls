import ForgeUI, {
  render,
  Fragment,
  Macro,
  Text,
  useProductContext,
  Button,
  useState,
  ModalDialog,
} from "@forge/ui";

const PollsPage = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Fragment>
      <Button text="Create Poll" onClick={() => setOpen(true)} />
      {isOpen && (
        <ModalDialog header="" onClose={() => setOpen(false)}>
            
        </ModalDialog>
      )}
    </Fragment>
  );
};

export default PollsPage;
