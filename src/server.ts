// import { Server } from "http"
// import app from "./app";
import { Rocket } from "./app";
import config from "./config";

(function main() {
  const port = config.PORT;
  const app = new Rocket();
  try {
    app.start();
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
})();