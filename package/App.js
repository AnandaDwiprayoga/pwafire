// import { pwa } from "./package/src/index.js";

// 1. Copy from a single element...
let element = document.getElementById("copy");
// Copy text...
pwa.copyText(element);

//  2. Copy from multiple elements...
let elements = document.querySelectorAll(".copy");
for (let el of elements) {
  // Copy text...
  pwa.copyText(el);
}     