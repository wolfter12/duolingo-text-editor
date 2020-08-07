import Observer from "./observer";
import onMutation from "./mutation-handler";

const targetNode = document.querySelector("#root");
const observerOptions = {
  childList: true,
  subtree: true,
};

const observer = new Observer(targetNode, observerOptions);

observer.stopAndRun(onMutation).start();
