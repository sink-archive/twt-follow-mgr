import { createSignal, Show } from "solid-js";
import MainLoaded from "./components/MainLoaded";
import MainNotLoaded from "./components/MainNotLoaded";
import { FollowedUser } from "./TwitterClient";

type UserData = {
  following: FollowedUser[];
}

export default () => {
  const [followers, setFollowers] = createSignal<FollowedUser[]>();

  return (
    <>
      <h1>twt-follow-mgr</h1>
      <p>Technologies that make this possible:</p>
      <ul>
        <li>Vite + Solid: UI and build tool</li>
        <li>Spitroast: patching fetch to get around CORS</li>
        <li>Cloudflare Workers: CORS proxy for this tool</li>
      </ul>

      <Show
        when={followers()}
        fallback={<MainNotLoaded setFollowers={setFollowers} />}
      >
        <MainLoaded followers={followers() ?? []} />
      </Show>
    </>
  );
};
