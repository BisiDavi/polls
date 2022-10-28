import ForgeUI, { useEffect, Fragment, useState, Text } from "@forge/ui";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function RegularPollTimer({ deadline }) {
  const parsedDeadline = Date.parse(deadline);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect((): any => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000
    );

    return () => clearInterval(interval);
  }, [parsedDeadline]);

  return (
    <Fragment>
      {Object.entries({
        Days: time / DAY,
        Hours: (time / HOUR) % 24,
        Minutes: (time / MINUTE) % 60,
        Seconds: (time / SECOND) % 60,
      }).map(([label, value]) => (
        <Fragment key={label}>
          <Text>{`${Math.floor(value)}`.padStart(2, "0")}</Text>
        </Fragment>
      ))}
    </Fragment>
  );
}
