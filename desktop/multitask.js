function sameOrigin(url) {
  const a = document.createElement("a");

  a.href = url;

  return a.hostname == window.location.hostname
   && a.port == window.location.port
   && a.protocol == window.location.protocol
}

function processMsg([ms, sender, ...msg]) {
  
}

const procs = {0: { // process 0 is multitask
  name: "multitask",
  dispName: "Multitask",
  worker: {postMessage: processMsg}
}};
let topPID = 0;

function spawn(url) {
  let worker;
  if (sameOrigin(url)) {
    worker = new Worker(url);
  } else {
    throw new Error("Cross-origin programs are not implemented yet.");
  }
  const name = url.replace(/^(?:.*\/)?(.+)\..*?$/g, "$1");
  const proc = {
    worker, name, dispName: name
  };
  procs[++topPID] = proc;
}
