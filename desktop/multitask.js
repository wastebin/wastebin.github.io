function sameOrigin(url) {
  const a = document.createElement("a");

  a.href = url;

  return a.hostname == window.location.hostname
   && a.port == window.location.port
   && a.protocol == window.location.protocol
}

function processMsg(pid, [ms, ...msg]) {
  if (msg[0] == "alert") {
    alert(msg[1]);
  }
}

const procs = {0: { // process 0 is multitask
  name: "multitask",
  dispName: "Multitask",
  worker: {postMessage: processMsg},
  index: 0
}};
let nextPid = 1;

function spawn(url) {
  let worker;
  if (sameOrigin(url)) {
    worker = new Worker(url);
  } else {
    throw new Error("Cross-origin programs are not implemented yet.");
  }
  const name = url.replace(/^(?:.*\/)?(.+)\..*?$/g, "$1");
  const proc = {
    worker, name, dispName: name, index: nextPid
  };
  procs[nextPid++] = proc;

  worker.addEventListener("message", function(msg) {
    processMsg(proc.index, msg);
  });
}
