import "./assets/main.css";
import "@fontsource/noto-sans-sc/400.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faLaptop,
  faMobileScreenButton,
  faTabletScreenButton,
} from "@fortawesome/free-solid-svg-icons";

import { createApp } from "vue";
import App from "./App.vue";

library.add(faLaptop);
library.add(faTabletScreenButton);
library.add(faMobileScreenButton);
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
