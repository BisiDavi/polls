import ForgeUI, { render, Fragment } from "@forge/ui";

import ModalView from "./components/ModalView";

const App = () => {
  // const context = useProductContext();
  // const [comments] = useState(
  //   async () => await fetchCommentsFromContent(context.contentId)
  // );

  // console.log(`Number of comments on this page: ${comments.length}`);

  return (
    <Fragment>
      <ModalView />
    </Fragment>
  );
};

export const run = render(<App />);
