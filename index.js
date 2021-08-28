const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

app.set("view engine", "ejs");
app.get("/home", (req, res) => {
  res.render("home");
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`User connected with id - ${socket.id}`);

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});
