import { authedUser } from "../TwitterClient";

export default () => (
  <>
    <h1>You are logged into twitter, your data:</h1>
    <pre>{JSON.stringify(authedUser(), null, "  ")}</pre>
  </>
);
