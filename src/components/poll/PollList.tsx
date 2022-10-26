import ForgeUI, { Text, Fragment, Em } from "@forge/ui";

interface Props {
  pollData: string[];
  type?: string;
}

export default function PollList({ pollData, type }: Props) {
  return (
    <Fragment>
      {pollData.map((item, index) => {
        const list = index + 1;
        const isIndex = item.includes(`${list}`) ? "" : list;
        return (
          <Text key={item}>
            {isIndex}. {type ? <Em>{item}</Em> : item}
          </Text>
        );
      })}
    </Fragment>
  );
}
