import app from "../../server.js";

const server = app.listen(0, "127.0.0.1", () => {
  process.send({ port: server.address().port });
});
