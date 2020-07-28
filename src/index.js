import "./css/style.css";

const EasyMDE = require("easymde_duolingo");

const editors = new Map();
const targetNode = document.querySelector("#root");
const observerOptions = {
  childList: true,
  subtree: true,
};
// eslint-disable-next-line no-use-before-define
const observer = new MutationObserver(onMutation);

observer.observe(targetNode, observerOptions);

function generateID() {
  return `ta${Date.now()}`;
}

function disableObserver() {
  observer.disconnect();
}

function enableObserver() {
  observer.observe(targetNode, observerOptions);
}

function createEditor(id, element) {
  const easyMDE = new EasyMDE({
    element: document.querySelector(`#${id}`),
    autoDownloadFontAwesome: false,
    forceSync: true,
    autosave: {
      enabled: false,
    },
    blockStyles: {
      bold: "**",
      code: "`",
      italic: "_",
    },
    insertTexts: {
      horizontalRule: ["", "\n- - -\n"],
    },
    theme: "duolingo",
    toolbar: [
      "bold",
      "italic",
      "strikethrough",
      "|",
      {
        name: "headers",
        className: "fa fa-header fa-heading",
        title: "Headers",
        children: [
          "heading-1",
          "heading-2",
          "heading-3",
          "heading-4",
          "heading-5",
          "heading-6",
        ],
      },
      "heading-smaller",
      "heading-bigger",
      "|",
      "quote",
      {
        name: "highlight",
        action: EasyMDE.toggleCodeBlock,
        className: "fa fa-pencil",
        title: "Highlight",
      },
      "|",
      "unordered-list",
      "ordered-list",
      "horizontal-rule",
      "|",
      "link",
      "image",
      "|",
      "undo",
      "redo",
      "|",
      "preview",
    ],
    spellChecker: false,
    status: false,
  });

  // TODO: Check if "UIEvents" is the most optimal option
  easyMDE.codemirror.on("change", () => {
    // eslint-disable-next-line no-param-reassign
    element.innerHTML = element.value;
    const event = document.createEvent("UIEvents");
    event.initUIEvent("change", true, true);
    element.dispatchEvent(event);
  });

  return easyMDE;
}

function addEditor(textareas) {
  textareas.forEach((textarea) => {
    if (!textarea.id) {
      const id = generateID();
      // eslint-disable-next-line no-param-reassign
      textarea.id = id;
      // stop observing, it needs to prevent recursive loop of mutationObserver
      disableObserver();
      const newEditor = createEditor(id, textarea);
      editors.set(id, newEditor);
      enableObserver();
    }
  });
}

function removeEditor(textareas) {
  textareas.forEach((textarea) => {
    if (editors.has(textarea.id)) {
      editors.delete(textarea.id);
    }
  });
}

// TODO: Create function for repetitive actions - addedNodes and removedNodes
function onMutation(mutations) {
  const ADDED_TEXTAREAS = [];
  const REMOVED_TEXTAREAS = [];

  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (!node.tagName) return; // not an element
      if (node.tagName === "TEXTAREA") {
        ADDED_TEXTAREAS.push(node);
      } else if (node.firstElementChild) {
        ADDED_TEXTAREAS.push(...node.getElementsByTagName("textarea"));
      }
    });
    mutation.removedNodes.forEach((node) => {
      if (!node.tagName) return; // not an element
      if (node.tagName === "TEXTAREA") {
        REMOVED_TEXTAREAS.push(node);
      } else if (node.firstElementChild) {
        REMOVED_TEXTAREAS.push(...node.getElementsByTagName("textarea"));
      }
    });
  });

  if (ADDED_TEXTAREAS.length) {
    addEditor(ADDED_TEXTAREAS);
  }

  if (REMOVED_TEXTAREAS.length) {
    removeEditor(REMOVED_TEXTAREAS);
  }
}
