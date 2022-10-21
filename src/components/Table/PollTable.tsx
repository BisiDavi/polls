import ForgeUI, {
  Text,
  useState,
  useEffect,
  Table,
  Head,
  Cell,
  Fragment,
  Button,
  Row,
  ButtonSet,
  Tag,
} from "@forge/ui";
import usePublish from "../../hooks/usePublish";
import formatPollTable from "../../lib/formatPollTable";

export default function PollTable({ setModal }) {
  const [savedPolls, setSavedPolls] = useState(null);
  const [deletePollStatus, setDeletePollStatus] = useState(false);
  const { getSavedPolls, deletePoll } = usePublish();
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

  const pollsData = savedPolls ? formatPollTable(savedPolls) : [];

  const head = [
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
        icon="add"
        iconPosition="before"
        appearance="primary"
        onClick={() => setModal(true)}
      />
      <Table>
        <Head>
          {head.map((item) => (
            <Cell key={item.key}>
              <Text>{item.text}</Text>
            </Cell>
          ))}
          <Cell>
            <Text>Action</Text>
          </Cell>
        </Head>
        {pollsData.map((item, index) => (
          <Row key={index}>
            {head.map((headItem, idx) => {
              return (
                <Cell key={idx}>
                  {headItem.key !== "type" ? (
                    <Text>{item[headItem.key]}</Text>
                  ) : item[headItem.key] === "Meeting Poll" ? (
                    <Tag text={item[headItem.key]} color="teal" />
                  ) : (
                    item[headItem.key] === "Regular Poll" && (
                      <Tag text={item[headItem.key]} color="blue" />
                    )
                  )}
                </Cell>
              );
            })}
            <Cell>
              <ButtonSet>
                <Button
                  text=""
                  icon="watch-filled"
                  iconPosition="after"
                  appearance="primary"
                  onClick={() => null}
                />
                <Button
                  text=""
                  icon="trash"
                  iconPosition="after"
                  appearance="danger"
                  onClick={() => deletePoll(item["key"])}
                />
              </ButtonSet>
            </Cell>
          </Row>
        ))}
      </Table>
    </Fragment>
  );
}
