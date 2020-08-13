import Observer from "./observer";

const observerOptions = {
  childList: true,
  subtree: true,
};

function getSubmitButton(target) {
  const ancestor = target.closest("._1KvMS");
  const submitButton = ancestor.querySelector("button._1qPrY._2pnz9._2NzLI.QHkFc");
  return submitButton;
}

export default function onSubmit(textarea, callback) {
  const submitButton = getSubmitButton(textarea);
  submitButton.addEventListener("click", () => {
    const observer = new Observer(textarea, observerOptions);
    observer.runAndStop(callback).start();
  });
}
