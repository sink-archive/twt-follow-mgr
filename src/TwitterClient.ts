import "./fetchPatch";
import { Client, auth } from "twitter-api-sdk";

const oauthClient = new auth.OAuth2User({
  callback: location.origin,
  client_id: "U1Z0R1p5bElackdmV1BIS0hrc1A6MTpjaQ",
  scopes: ["follows.read", "follows.write", "list.read", "users.read"],
});

const STATE = "OAUTH_STATE_SRNTORFNDORIESNOSUNRDP";
const CHALLENGE = "OAUTH_CHALLENGE_SONTRSIDHOSRETOMSRD"

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
		const state = matches.find(m => m[1] === "state")![2];
	  const code = matches.find(m => m[1] === "code")![2];

		if (state !== STATE) throw new Error("oauth states do not match");

		// to populate CHALLENGE into the state, hacky but works!
	  oauthClient.generateAuthURL({
		  state: STATE,
		  code_challenge_method: "plain",
		  code_challenge: CHALLENGE
	  });

    console.log(await oauthClient.requestAccessToken(code));
  } else {
		// redirect to twitter
    location.href = oauthClient.generateAuthURL({
	    state: STATE,
	    code_challenge_method: "plain",
	    code_challenge: CHALLENGE
    });
  }
}

export const client = new Client(oauthClient);

export const getUserId = (username: string) =>
  client.users
    .findUserByUsername(username[0] === "@" ? username.slice(1) : username)
    .then((u) => u.data?.id);

export type FollowedUser = { id: string; name: string; username: string };

export async function getFollowing(id: string) {
  const following: FollowedUser[] = [];

  for await (const page of client.users.usersIdFollowing(id, {
    max_results: 1000,
  })) {
    if (page.data) following.push(...page.data);
  }

  return following;
}
