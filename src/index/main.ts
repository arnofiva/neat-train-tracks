// import "./style.scss";

import App from "./App";
import Tracks from "./Tracks";

Tracks.load().then((tracks) => {
  new App({
    tracks,
    container: "app"
  });
});