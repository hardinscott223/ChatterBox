const express = require("express");
const socket = require("socket.io");

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
const server = app.listen(4000, function () {
  console.log("Listening to port 4000...");
});

app.use(express.static("public"));
const io = socket(server);

io.on("connection", function (socket) {
  console.log("New user connected", socket.id);

  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
  socket.on("stop typing", function (data) {
    socket.broadcast.emit("stop typing", data);
  });
});
app.get("/", (req, res) => {
  res.render("allchat", {
    title: "Home",
  });
});
app.get("/groups", (req, res) => {
  res.render("groups", {
    title: "Groups",
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
});
app.get("/setting", (req, res) => {
  res.render("setting", {
    title: "Setting",
  });
});
app.get("/profile", (req, res) => {
  res.render("profile", {
    title: "Profile",
  });
});
app.use((req, res) => {
  res.status(404).render("404");
});
