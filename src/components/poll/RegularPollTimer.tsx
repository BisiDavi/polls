import ForgeUI, {
  useEffect,
  Fragment,
  useState,
  Text,
  Strong,
} from "@forge/ui";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

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
      <Text>
        <Strong>
          {Object.entries({
            Hour: (time / HOUR) % 24,
            Minute: (time / MINUTE) % 60,
            Second: (time / SECOND) % 60,
          }).map(([label, value]) => {
            const timeString = `${Math.floor(value)}`.padStart(2, "0");
            const hourLabel = label === "Hour" && value > 1 ? "hrs" : "hr";
            const minuteLabel =
              label === "Minute" && value > 1 ? "mins" : "min";
            const secondLabel =
              label === "Second" && value > 1 ? "secs" : "sec";
            const timeLabel =
              label === "Hour"
                ? hourLabel
                : label === "Minute"
                ? minuteLabel
                : secondLabel;
            return `${timeString}${timeLabel} `;
          })}
          remaining for poll to end.
        </Strong>
      </Text>
    </Fragment>
  );
}
