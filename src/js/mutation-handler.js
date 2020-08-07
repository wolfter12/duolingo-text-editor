import EditorsManager from "./editors-manager";

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
        const elements = node.getElementsByTagName("textarea");
        if (elements.length) {
          ADDED_TEXTAREAS.push([...elements].pop());
        }
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
