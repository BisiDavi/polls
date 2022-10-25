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
  Image,
  SectionMessage,
} from "@forge/ui";

import usePublish from "../../hooks/usePublish";
import formatPollTable from "../../lib/formatPollTable";
import PollModal from "../modal/PollModal";

export default function PollTable({ setModal }) {
  const [savedPolls, setSavedPolls] = useState(null);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [showPollModal, setShowPollModal] = useState(false);
  const { getSavedPolls, deletePoll } = usePublish();

  const polls = [];

  async function deletePollHandler(pollKey: string) {
    await deletePoll(pollKey).then(() => {
      setSavedPolls(null);
    });
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
    { key: "pollStatus", text: "Poll Status" },
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
      {savedPolls === null ? (
        <Image
          src="https://res.cloudinary.com/verrb-inc/image/upload/v1666363950/loader-gif_i7owby.gif"
          alt="loader"
        />
      ) : pollsData.length > 0 ? (
        <Fragment>
          <Button
            text="Create New Poll"
            icon="add"
            iconPosition="before"
            appearance="primary"
            onClick={() => setModal(true)}
          />
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
                      onClick={() => deletePollHandler(item["key"])}
                    />
                  </ButtonSet>
                </Cell>
              </Row>
            ))}
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
