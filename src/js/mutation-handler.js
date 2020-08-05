import EditorsManager from "./editors-manager";

console.log("mutation-hadler");

const editorsManager = new EditorsManager();

export default function onMutation(mutations) {
  const ADDED_TEXTAREAS = [];
  const REMOVED_TEXTAREAS = [];

  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (!node.tagName) return;
      if (node.tagName === "TEXTAREA") {
        ADDED_TEXTAREAS.push(node);
      } else if (node.firstElementChild) {
        ADDED_TEXTAREAS.push(...node.getElementsByTagName("textarea"));
      }
    });
    mutation.removedNodes.forEach((node) => {
      if (!node.tagName) return;
      if (node.tagName === "TEXTAREA") {
        REMOVED_TEXTAREAS.push(node);
      } else if (node.firstElementChild) {
        REMOVED_TEXTAREAS.push(...node.getElementsByTagName("textarea"));
      }
    });
  });

  if (ADDED_TEXTAREAS.length) {
    editorsManager.addEditor(ADDED_TEXTAREAS);
  }

  if (REMOVED_TEXTAREAS.length) {
    editorsManager.removeEditor(REMOVED_TEXTAREAS);
  }
}
