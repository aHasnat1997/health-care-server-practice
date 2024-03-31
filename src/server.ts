// import { Server } from "http"
// import app from "./app";
import { Rocket } from "./app";
import config from "./config";

(function main() {
  const port = config.PORT;
  const rocket = new Rocket();
  try {
    rocket.start();
    rocket.launch(port);
  } catch (error) {
    console.log(error);
  }
})();