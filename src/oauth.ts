import "./fetchPatch";
import { auth } from "twitter-api-sdk";
import { createSignal } from "solid-js";

export const oauthClient = new auth.OAuth2User({
  callback: location.origin,
  client_id: "U1Z0R1p5bElackdmV1BIS0hrc1A6MTpjaQ",
  scopes: ["follows.read", "follows.write", "list.read", "users.read"],
});

const STATE = "OAUTH_STATE_SRNTORFNDORIESNOSUNRDP";
const CHALLENGE = "OAUTH_CHALLENGE_SONTRSIDHOSRETOMSRD";

export async function handleAuthentication() {
  const matches = Array.from(
    location.search.matchAll(/(?:[&?]((?:code|state))=([a-zA-Z0-9_]+))/g)
  );

  if (
    matches.length === 2 &&
    matches.filter((m) => m[1] === "state").length === 1 &&
    matches.filter((m) => m[1] === "code").length === 1
  ) {
    // callback
    const state = matches.find((m) => m[1] === "state")![2];
    const code = matches.find((m) => m[1] === "code")![2];

    if (state !== STATE) throw new Error("oauth states do not match");

    // to populate CHALLENGE into the state, hacky but works!
    oauthClient.generateAuthURL({
      state: STATE,
      code_challenge_method: "plain",
      code_challenge: CHALLENGE,
    });

    try {
      await oauthClient.requestAccessToken(code);
    }
    catch {
      // just retry lol
      location.search = "";
    }

    if (history?.pushState) {
      const newUrl = new URL(location.href);
      newUrl.search = "";
      history.pushState({path: newUrl.href}, '', newUrl.href);
    }

    return true;
  } else {
    // redirect to twitter
    location.href = oauthClient.generateAuthURL({
      state: STATE,
      code_challenge_method: "plain",
      code_challenge: CHALLENGE,
    });
  }
}

const [isAuthed, setIsAuthed] = createSignal(false);

// noinspection PointlessBooleanExpressionJS
handleAuthentication().then((ret) => setIsAuthed(!!ret));

export { isAuthed };