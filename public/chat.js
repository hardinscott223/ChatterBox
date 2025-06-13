const socket = io.connect("http://localhost:4000");

const send = document.getElementById("send");
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const output = document.getElementById("output");
const typing = document.getElementById("typing");
let isTyping = false;
let typingTimeout;

message.addEventListener("keypress", function () {
  const username = handle.value;

  if (!isTyping && username) {
    isTyping = true;
    socket.emit("typing", username);
  }

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    isTyping = false;
    socket.emit("stop typing");
  }, 1000);
});

function sendMessage() {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
  message.value = "";
}
send.addEventListener("click", sendMessage);
message.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    sendMessage();
  }
});

socket.on("chat", function (data) {
  if (data.message == "") {
    output.innerHTML = "";
  }
  output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
});

socket.on("typing", function (data) {
  typing.innerHTML += `<p><em> ${data} is typing...</em></p>`;
});

socket.on("stop typing", function (username) {
  typing.innerHTML = "";
});
