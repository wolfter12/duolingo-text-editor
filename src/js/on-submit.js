import Observer from "./observer";

const observerOptions = {
  childList: true,
  subtree: true,
};

function getSubmitButton(target) {
  const siblings = [...target.parentNode.children];
  const parentOfButton = siblings.pop();
  const submitButton = parentOfButton.querySelector("button");
  return submitButton;
}

export default function onSubmit(textarea, callback) {
  const submitButton = getSubmitButton(textarea);
  submitButton.addEventListener("click", () => {
    const observer = new Observer(textarea, observerOptions);
    observer.runAndStop(callback).start();
  });
}
