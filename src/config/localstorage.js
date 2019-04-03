import { LocalStorage } from "node-localstorage";

let storage;

if (typeof localStorage === "undefined" || localStorage === null) {
  storage = new LocalStorage('./scratch');
} else {
  storage = localStorage;
}

export default storage;