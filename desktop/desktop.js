function *run(compositor, program) {
  let quit = false;
  while (!quit) {
    let [which, e] = yield;
    switch (which) {
      "compositor":
        break;
      "program":
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
}

addEventListener("load", main);
