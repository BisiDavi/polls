import ForgeUI, {
  render,
  Fragment,
  Macro,
  Text,
  useProductContext,
  useState,
} from "@forge/ui";
import api, { route } from "@forge/api";

// import PollTitle from "@/components/PollTitle";
import PollTitle from "./components/PollTitle";

const fetchCommentsFromContent = async (contentId) => {
  const res = await api
    .asUser()
    .requestConfluence(
      route`/wiki/rest/api/content/${contentId}/child/comment`
    );
  const data = await res.json();

  return data.results;
};

const App = () => {
  const context = useProductContext();
  const [comments] = useState(
    async () => await fetchCommentsFromContent(context.contentId)
  );

  console.log(`Number of comments on this page: ${comments.length}`);

  return (
    <Fragment>
      <Text>Hello David!</Text>
      <Text> Comments: {comments.length}</Text>
      <PollTitle />
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
