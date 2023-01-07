import { before } from "spitroast";

const proxyUrl = "https://twt-follow-mgr-prox.yellowsink-cf.workers.dev/";

before("fetch", window, ([url, ...args]) => [
  url.includes("api.twitter.com") ? proxyUrl + url : url,
  ...args,
]);
