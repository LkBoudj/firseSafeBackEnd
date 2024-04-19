import http from "http";
import app from "./app.mjs";
import mainDb from "./configs/db.mjs";

const port = process.env.PORT || 3000;

const server = http.createServer(app);

mainDb();
server.listen(port, () => {
  console.log(`stating server http://localhost:${port}`);
});
