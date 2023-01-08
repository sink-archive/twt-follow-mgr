import "./fetchPatch";
import { Client } from "twitter-api-sdk";
import {isAuthed, oauthClient} from "./oauth";
import {createEffect, createSignal} from "solid-js";

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


const [authedUser, setAuthedUser] = createSignal<Awaited<ReturnType<typeof client.users.findMyUser>>>();
export {authedUser};
let authedUserRan = false;
createEffect(async () => {
  if (authedUserRan) return;

  if (isAuthed()) {
    authedUserRan = true;
    client.users.findMyUser().then(setAuthedUser);
  }
})