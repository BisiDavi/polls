import usePublish from "@/hooks/usePublish";
import ForgeUI, {
  Text,
  useState,
  useEffect,
  Table,
  Head,
  Cell,
} from "@forge/ui";

export default function PollTable() {
  const [savedPolls, setSavedPolls] = useState(null);
  const { getSavedPolls } = usePublish();
  const polls = [];

  useEffect(async () => {
    if (savedPolls === null) {
      await getSavedPolls().then((response) => {
        let pollData = {};
        response.results.map((item: any) => {
          pollData = {
            value: JSON.parse(item?.value),
            key: item.key,
          };
          polls.push(pollData);
        });
        setSavedPolls(polls);
      });
    }
  }, []);

  console.log("savedPolls", savedPolls);

  const head = [
    { key: "id", text: "S/N" },
    { key: "Title", text: "Title" },
    { key: "Author", text: "Author" },
    { key: "Date", text: "Date Created" },
    { key: "PollType", text: "Poll Type" },
    { key: "PollStatus", text: "Poll Status" },
  ];
  return (
    <Table>
      <Head>
        {head.map((item) => (
          <Cell key={item.key}>
            <Text>{item.text}</Text>
          </Cell>
        ))}
      </Head>
    </Table>
  );
}
