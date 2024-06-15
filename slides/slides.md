---
marp: true
theme: default
paginate: true
title: Modern toolchain
math: mathjax
---

<style>
* {
  color: #000;
}
section {
  background: #fff;
}
div {
  color: #000;
  font-weight: 500;
}
p {
  color: #000;
}
h1 {
  font-size: 75px;
  color: #000;
}
h2 {
  font-size: 65px
}
h3 {
  font-size: 55px
}
.title {
  font-size: 75px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.subtitle {
  font-size: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.center {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.vert_center {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.flex {
  display: flex;
  gap: 15px;
  width: 100%;
}

</style>

# Modern Frontend Toolchain ✨

By Lee Zong Xun

---

## Who am I?

<div class='flex'>
<div>
<div style="display:block;width:600px;font-weight:400;">
I am a senior [at] NUS, studying computer science and statistics. I have interned at Tiktok, Juypterlab, Expensify and CVWO. I am also the Vice President of NUS GDSC and the Program Lead of SoC TIPS.
</div>

<div class='flex' style='margin-top:1rem;'>
  <img src='images/image-1.png' alt='dsc'/>
  <img src='images/image-2.png' alt='tips'/>
</div>
</div>

<img src='images/image.png' width='400px' alt='whoami'/>
</div>

---

## Let's dive into the toolchain 🚀

How Vite and other development environments work

---

## Two "Major" Parts

- `npm run dev` - development
- `npm run build` - build for production

---

## Part 1: We need JavaScript (that works in the browser)

<div class='flex'>

- TSX
  - Remove types (JSX left)
  - Change JSX in JS
  - Change JS to other JS
  - Transform `node_modules` imports to relative paths with extensions

<img src="https://app.eraser.io/workspace/1CfLxNLf9DY9E9Ndesq4/preview?elements=1wJ7u0__okh-IOd67YWp_g&type=embed" width='300px'/>
</div>

---

## Part 2: We need a good DX

- HMR
- Source maps
- It should be fast

---

## Part 3: We need a good prod PX

- bundle should be small
- remove unused code
- type check, be confident in your app

---

## Brief Overview

[Link to diagram](https://app.eraser.io/workspace/1CfLxNLf9DY9E9Ndesq4/preview?elements=XHQepzyu8r9eQBKuQ4ijlQ&type=embed)

---

## Hot Module Reload 🔥

Goal: a good frontend toolchain will make HMR "free"

User doesn't need to do anything special - just save their file, and see the updates!

[Link to diagram](https://app.eraser.io/workspace/ZqRsrZYqXUh408VmE6et/preview?elements=nXS12lpyroGEtw9NPYhpGA&type=embed)

---

### Server

- Express static server
- HMR middleware
  - This is the "dev server"
  - Intercept \*.js , inject HMR "client"

---

### Client

- `HotModule` class implementation
- `hmrClient` function to "initialize" the HMR and connect to the web socket
- "register" the accept callback

  - this is what to do when the module is saved/changed. Eg how to HMR for this specific module type

- websocket to respond to Dev Server events (connectWs )

---

### Dev Server

- `WebSocket` server
- file watcher
- notify HMR client of file changes
- trigger reload of module

---

### [Credits to Lachlan Miller](https://github.com/lmiller1990) 💪🏻
