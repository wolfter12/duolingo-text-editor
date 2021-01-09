import "../scss/style.scss";

import clearEditorOnSubmit from "./on-submit";
import duolingoShortcuts from "./shortcuts";
import duolingoToolbar from "./toolbar";

const EasyMDE = require("easymde_duolingo");

export default function createEditor(editorOptions) {
  const target = document.querySelector(`[data-editor-id=${editorOptions.dataEditorId}]`);

  const easyMDE = new EasyMDE({
    element: target,
    autoDownloadFontAwesome: false,
    forceSync: true,
    // autofocus: true,
    autosave: {
      enabled: false,
    },
    blockStyles: {
      bold: "**",
      code: "`",
      italic: "_",
    },
    indentWithTabs: false,
    insertTexts: {
      horizontalRule: ["", "\n- - -\n"],
    },
    renderingConfig: {
      singleLineBreaks: false,
    },
    theme: "duolingo",
    toolbar: duolingoToolbar,
    shortcuts: duolingoShortcuts,
    spellChecker: false,
    status: false,
  });

  easyMDE.codemirror.on("change", () => {
    // eslint-disable-next-line no-param-reassign
    editorOptions.element.innerHTML = editorOptions.element.value;
    const event = document.createEvent("UIEvents");
    event.initUIEvent("change", true, true);
    editorOptions.element.dispatchEvent(event);
  });

  function clearEditor() {
    easyMDE.codemirror.setValue("");
    easyMDE.codemirror.clearHistory();
  }

  if (target.closest("._1KvMS")) {
    clearEditorOnSubmit(target, clearEditor);
  }

  if (editorOptions.focus) {
    easyMDE.codemirror.focus();
  }

  return easyMDE;
}
