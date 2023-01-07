import { render } from "solid-js/web";
import App from "./App";
import * as TwitterClient from "./TwitterClient";

render(App, document.getElementById("root")!);

// @ts-expect-error
window["client"] = TwitterClient;