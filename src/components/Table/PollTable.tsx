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
  SectionMessage,
  User,
} from "@forge/ui";

import PollModal from "../modal/PollModal";
import usePublish from "../../hooks/usePublish";
import formatPollTable from "../../lib/formatPollTable";
import useStorage from "../../hooks/useStorage";
import toSlug from "../../lib/toSlug";

export default function PollTable({ setModal, savedPolls, setSavedPolls }) {
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [showPollModal, setShowPollModal] = useState(false);
  const { getSavedPolls, deletePoll } = usePublish();
  const { deleteStorage } = useStorage();

  const polls = [];

  async function deletePollHandler(pollKey: string, deleteChartKey: string) {
    try {
      await deletePoll(pollKey);
      await deleteStorage(deleteChartKey);
      setSavedPolls(null);
    } catch (error) {
      console.log("error", error);
    }
  }

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
  }, [savedPolls]);

  const pollsData = savedPolls ? formatPollTable(savedPolls) : [];

  const head = [
    { key: "title", text: "Title" },
    { key: "author", text: "Author" },
    { key: "date", text: "Date Created" },
    { key: "type", text: "Poll Type" },
    { key: "status", text: "Status" },
  ];

  function viewPollHandler(pollKey: string) {
    const selectedPollData = savedPolls
      ? savedPolls.filter((item) => item.key === pollKey)[0]
      : null;
    setSelectedPoll(selectedPollData);
    setShowPollModal(true);
  }

  return (
    <Fragment>
      <Button
        text="Create New Meeting/Poll"
        icon="add"
        iconPosition="before"
        appearance="primary"
        onClick={() => setModal(true)}
      />
      {pollsData.length > 0 ? (
        <Fragment>
          {showPollModal && selectedPoll && (
            <PollModal
              setPollModal={setShowPollModal}
              data={selectedPoll.value}
            />
          )}
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
            {pollsData.map((item, index) => {
              const deleteKeyType =
                item["type"] === "Meeting Planning" ? "Agenda" : "Vote";
              const deleteChartKey = `${deleteKeyType}-${toSlug(
                item["rowId"]
              )}`;
              return (
                <Row key={index}>
                  {head.map((headItem, idx) => (
                    <Cell key={idx}>
                      {headItem.key === "author" ? (
                        <User accountId={item[headItem.key]} />
                      ) : headItem.key !== "type" ? (
                        <Text>{item[headItem.key]}</Text>
                      ) : item[headItem.key] === "Meeting Planning" ? (
                        <Tag text={item[headItem.key]} color="teal" />
                      ) : (
                        item[headItem.key] === "Regular Poll" && (
                          <Tag text={item[headItem.key]} color="blue" />
                        )
                      )}
                    </Cell>
                  ))}
                  <Cell>
                    <ButtonSet>
                      <Button
                        text=""
                        icon="graph-bar"
                        iconPosition="after"
                        appearance="primary"
                        onClick={() => viewPollHandler(item.key)}
                      />
                      <Button
                        text=""
                        icon="trash"
                        iconPosition="after"
                        appearance="danger"
                        onClick={() =>
                          deletePollHandler(item["key"], deleteChartKey)
                        }
                      />
                    </ButtonSet>
                  </Cell>
                </Row>
              );
            })}
          </Table>
        </Fragment>
      ) : (
        <SectionMessage title="Polls" appearance="error">
          <Text>
            No poll yet, click on the "Create New Poll" to create Poll
          </Text>
        </SectionMessage>
      )}
    </Fragment>
  );
}
