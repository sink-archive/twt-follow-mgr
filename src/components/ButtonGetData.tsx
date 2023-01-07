import { createSignal } from "solid-js";
import { FollowedUser, getFollowing, getUserId } from "../TwitterClient";

export default (props: {
  username: string;
  setFollowers(f: FollowedUser[]): void;
}) => {
  const [isFetching, setIsFetching] = createSignal(false);

  return (
    <button
      disabled={isFetching()}
      onClick={async () => {
        if (isFetching()) return;
        setIsFetching(true);

        const id = await getUserId(props.username);
        if (id) props.setFollowers(await getFollowing(id));

        setIsFetching(false);
      }}
    >
      {isFetching() ? "Fetching following..." : "Get following"}
    </button>
  );
};
