import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";

import express from "express";
import chokidar from "chokidar";
import { WebSocket, WebSocketServer } from "ws";
import { readFile } from "node:fs";

const app = express();
const server = http.createServer(app);
const ws = new WebSocketServer({
  server,
});

/** @type {WebSocket} */
let socket;

ws.on("connection", (_socket) => {
  console.log("Connected...");
  socket = _socket;
});

const watcher = chokidar.watch("src/*.js");

watcher.on("change", (file) => {
  console.log(file);
  const payload = JSON.stringify({
    type: "file:changed",
    file: `/${file}`,
  });
  socket.send(payload);
});

/** @type {express.Handler} */
const hmrMiddleware = async (req, res, next) => {
  //

  if (!req.url.endsWith(".js")) {
    return next();
  }

  let client = await fs.readFile(path.join(process.cwd(), "client.js"), "utf8");
  let content = await fs.readFile(path.join(process.cwd(), req.url), "utf8");

  content = `
  ${client}

  hmrClient(import.meta)

  ${content}
  `;

  res.type(".js");
  res.send(content);
};

app.use(hmrMiddleware);
app.use(express.static(process.cwd()));

server.listen(8080, () => console.log("Listening on port 8080"));
