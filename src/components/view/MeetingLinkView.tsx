import ForgeUI, { Text, Fragment, Link, Strong } from "@forge/ui";

export default function MeetingLinkView({ meetingLinkResult }) {
  return (
    <Fragment>
      {meetingLinkResult !== null && typeof meetingLinkResult === "object" ? (
        <Fragment>
          <Text>
            <Strong>Meeting Link (Host/Start URL):</Strong>
            <Link href={meetingLinkResult.start_url} openNewTab>
              {meetingLinkResult.start_url}
            </Link>
          </Text>
          <Text>
            <Strong>Meeting Link (Invite):</Strong>
            <Link href={meetingLinkResult.join_url} openNewTab>
              {meetingLinkResult.join_url}
            </Link>
          </Text>
          <Text>
            <Strong>Password :</Strong>
            {meetingLinkResult.password}
          </Text>
        </Fragment>
      ) : (
        meetingLinkResult && (
          <Text>
            <Strong>Meeting Link:</Strong>
            <Link href={meetingLinkResult} openNewTab>
              {meetingLinkResult}
            </Link>
          </Text>
        )
      )}
    </Fragment>
  );
}
