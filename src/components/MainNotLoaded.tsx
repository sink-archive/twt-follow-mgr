import { createSignal } from "solid-js";
import { FollowedUser } from "../TwitterClient";
import ButtonGetData from "./ButtonGetData";

export default (props: { setFollowers(f: FollowedUser[]): void }) => {
  const [user, setUser] = createSignal("");

  return (
    <>
      <input
        value={user()}
        onInput={(e) => setUser((e.target as HTMLInputElement).value)}
        placeholder="Enter your twitter username"
      />

      <ButtonGetData username={user()} setFollowers={props.setFollowers} />
    </>
  );
};