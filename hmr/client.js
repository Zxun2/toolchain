class HotModule {
  file;
  cb;

  constructor(file) {
    this.file = file;
  }

  accept(cb) {
    this.cb = cb;
  }

  handleAccept() {
    if (!this.cb) {
      return;
    }

    import(`${this.file}?t=${Date.now()}`).then((newMod) => {
      this.cb(newMod);
    });
  }
}

function hmrClient(mod) {
  const url = new URL(mod.url);
  const hot = new HotModule(url.pathname);
  import.meta.hot = hot;
  window.hotModules.set(url.pathname, hot);
}

/** @type {Map<string, HotModule>} */
window.hotModules ??= new Map();

window.ws;

if (!window.ws) {
  const ws = new window.WebSocket("ws://localhost:8080");

  ws.addEventListener("message", (msg) => {
    const data = JSON.parse(msg.data);
    const mod = window.hotModules.get(data.file);
    console.log(data.file);
    mod.handleAccept();
  });

  window.ws = ws;
}
