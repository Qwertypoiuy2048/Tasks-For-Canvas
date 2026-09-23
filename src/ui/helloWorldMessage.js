function addHelloWorldMessage(document) {
  const message = document.createElement("div");
  message.id = "canvas-tasks-hello-world";
  message.textContent = "Hello World";
  document.body.append(message);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { addHelloWorldMessage };
}
