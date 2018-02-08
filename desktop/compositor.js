function *run() {
  let ready = false;
  
  let quit = false;
  while (!quit) {
    let e = yield;
    if (!ready) {
      if (e.message.type == init) {
        ready = true;
        setTimeout(4000, function() {
          postMessage({type: "alert", text: "Hello, world!"});
        });
      }
      continue;
    }
  }
}
