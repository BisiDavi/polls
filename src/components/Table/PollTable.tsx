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
  Em,
  Strong,
  useProductContext,
} from "@forge/ui";

import PollModal from "../modal/PollModal";
import usePublish from "../../hooks/usePublish";
import formatPollTable from "../../lib/formatPollTable";
import useStorage from "../../hooks/useStorage";
import toSlug from "../../lib/toSlug";

export default function PollTable({ modal }) {
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [savedPolls, setSavedPolls] = useState(null);
  const context = useProductContext();

  const [showPollModal, setShowPollModal] = useState(false);
  const { deletePoll } = usePublish();
  const { deleteStorage, getDataFromStorage } = useStorage();

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
    await getDataFromStorage(`Page-Polls-${context.contentId}`).then(
      (response) => {
        let pollData = {};
        response.results.map((item: any) => {
          pollData = {
            value: JSON.parse(item?.value),
            key: item.key,
          };
          polls.push(pollData);
        });
        setSavedPolls(polls);
      }
    );
  }, [modal]);

  const pollsData = savedPolls ? formatPollTable(savedPolls) : [];

  const sortedPolls =
    pollsData.length > 0
      ? pollsData.sort(
          (a, b) => Number(new Date(b.sortDate)) - Number(new Date(a.sortDate))
        )
      : [];

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
      <Text>
        <Strong>Welcome to Workspace Meeting & Poll</Strong>
      </Text>
      {sortedPolls.length > 0 ? (
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
            {sortedPolls.map((item, index) => {
              const deleteKeyType =
                item["type"] === "Meeting Planning" ? "Agenda" : "Vote";
              const deleteChartKey = `${deleteKeyType}-${toSlug(
                item["rowId"]
              )}`;
              const indexNumber = index + 1;

              return (
                <Row key={index}>
                  {head.map((headItem, idx) => (
                    <Cell key={idx}>
                      {headItem.key === "author" ? (
                        <User accountId={item[headItem.key]} />
                      ) : headItem.key === "title" ? (
                        <Text>{`${indexNumber}. ${item[headItem.key]}`}</Text>
                      ) : headItem.key === "status" ? (
                        item[headItem.key] ? (
                          <Tag text="Active" color="green" />
                        ) : (
                          <Tag text="Inactive" color="red" />
                        )
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
          <Text>
            Invite team member to participate in suggesting meeting agenda or
            poll by mentioning them, <Em>@username</Em>
          </Text>
        </Fragment>
      ) : (
        <SectionMessage title="Meeting & Polls" appearance="error">
          <Text>
            No meeting/poll for this page yet, click on the "Create New Meeting/Poll" to get
            started
          </Text>
        </SectionMessage>
      )}
    </Fragment>
  );
}
