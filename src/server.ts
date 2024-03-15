import { Server } from "http"
import app from "./app";
import config from "./config";

const port = config.PORT;

(async function main() {
  try {
    app.listen(port, () => console.log('Server is running on port: ', port));
  } catch (error) {
    console.log(error);
  }
})()