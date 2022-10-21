import ForgeUI, {
  Text,
  useState,
  useEffect,
  Table,
  Head,
  Cell,
  Fragment,
  Button,
} from "@forge/ui";

import usePublish from "../../hooks/usePublish";

export default function PollTable({ setModalState }) {
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
    { key: "title", text: "Title" },
    { key: "author", text: "Author" },
    { key: "date", text: "Date Created" },
    { key: "type", text: "Poll Type" },
    { key: "pollStatus", text: "Poll Status" },
  ];
  return (
    <Fragment>
      <Button
        text="Create New Poll"
        icon="add-circle"
        iconPosition="before"
        onClick={() => setModalState(true)}
      />
      <Table>
        <Head>
          {head.map((item) => (
            <Cell key={item.key}>
              <Text>{item.text}</Text>
            </Cell>
          ))}
        </Head>
      </Table>
    </Fragment>
  );
}
