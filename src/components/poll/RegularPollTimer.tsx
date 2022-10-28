import ForgeUI, {
  useEffect,
  Fragment,
  useState,
  Text,
  ButtonSet,
} from "@forge/ui";

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
        D: time / DAY,
        H: (time / HOUR) % 24,
        M: (time / MINUTE) % 60,
        S: (time / SECOND) % 60,
      }).map(([label, value]) => {
        const timeString = `${Math.floor(value)}`.padStart(2, "0");
        return (
          <ButtonSet key={label}>
            {/* <Button text="" /> */}
            <Text>
              {label}:{`${Math.floor(value)}`.padStart(2, "0")}
            </Text>
          </ButtonSet>
        );
      })}
    </Fragment>
  );
}
