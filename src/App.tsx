import { createSignal, Show } from "solid-js";
import MainLoaded from "./components/MainLoaded";
import { isAuthed } from "./oauth";
import { UserData } from "./TwitterClient";

export default () => {
  const [userData, setUserData] = createSignal<UserData>();

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
        when={isAuthed()}
        fallback={
          "Logging into Twitter... If you see this for too long something probably failed."
        }
      >
        <MainLoaded />
      </Show>
    </>
  );
};
