const test = require("node:test");
const assert = require("node:assert/strict");
const { addHelloWorldMessage } = require("../../src/ui/helloWorldMessage.js");

test("adds a Hello World message to the page", () => {
  const message = { textContent: "", id: "" };
  const document = {
    createElement: () => message,
    body: {
      appended: null,
      append: (element) => {
        document.body.appended = element;
      },
    },
  };

  addHelloWorldMessage(document);

  assert.equal(message.id, "canvas-tasks-hello-world");
  assert.equal(message.textContent, "Hello World");
  assert.equal(document.body.appended, message);
});
