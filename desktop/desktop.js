function *run(compositor, program) {
  let compositorReady = false;
  let programReady = false;

  let quit = false;
  while (!quit) {
    let [which, e] = yield;
    switch (which) {
      "compositor":
        switch (e.message.type) {
          case "ready":
            compositorReady = true;
            program.postMessage({type: "init"});
            break;
          case "alert":
            alert(e.message.text);
            break;
        }
        break;
      "program":
        switch (e.message.type) {
          case "ready":
            programReady = true;
            break;
        }
        break;
    }
  }
}

function main() {
  const compositor = new Worker("compositor.js");
  const program = new Worker("hello.js");

  const runner = run(compositor, program);

  runner.next();

  compositor.addEventListener("message", function(e) {
    runner.next("compositor", e);
  });
  program.addEventListener("message", function(e) {
    runner.next("program", e);
  });

  compositor.postMessage({type: "init"});
}

addEventListener("load", main);
