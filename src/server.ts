import { Server } from "http"
import app from "./app";
import config from "./config";

const port = config.PORT;

(function main() {
  try {
    app.listen(port, () => console.info('Server 🔥 on port:', port));
  } catch (error) {
    console.log(error);
  }
})();