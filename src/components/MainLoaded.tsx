import { userData } from "../TwitterClient";

/*const prettyPrint = (o: any) => JSON.stringify(o)?.replaceAll(/"([^"]+)":/g, "$1:")
  .replaceAll(/[:,{]/g, "$& ")
  .replaceAll("}", " }");*/

const prettyPrint = (o: any) => JSON.stringify(o, null, "  ");

export default () => (
  <>
    <h1>You are logged into twitter</h1>

    user data: <pre style="display: inline">{prettyPrint(userData())}</pre>
    <br />


  </>
);
