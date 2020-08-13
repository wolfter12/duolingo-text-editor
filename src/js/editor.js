import "../scss/style.scss";

import clearEditorOnSubmit from "./on-submit";

const EasyMDE = require("easymde_duolingo");

export default function createEditor(editorOptions) {
  const target = document.querySelector(`[data-editor-id=${editorOptions.dataEditorId}]`);

  const duolingoToolbar = [
    "bold",
    "italic",
    "strikethrough",
    "|",
    {
      name: "headers",
      className: "fa fa-header fa-heading",
      title: "Headers",
      children: [
        "heading-2",
        "heading-3",
        "heading-4",
        "heading-5",
        "heading-6",
      ],
    },
    {
      name: "highlight",
      action: EasyMDE.toggleCodeBlock,
      className: "fa fa-pencil",
      title: "Highlight",
    },
    "|",
    "quote",
    "unordered-list",
    "ordered-list",
    "|",
    {
      name: "new-line",
      action: function addNewLine(editor) {
        const cm = editor.codemirror;
        const newLine = "  \n";
        cm.replaceSelection(newLine);
        cm.focus();
      },
      className: "fa fa-paragraph",
      title: "New line",
    },
    "horizontal-rule",
    "|",
    "link",
    "image",
    "|",
    "undo",
    "redo",
    "|",
    "preview",
  ];

  const duolingoShortcuts = {
    toggleBold: null,
    toggleItalic: null,
    drawLink: null,
    toggleHeadingSmaller: null,
    toggleHeadingBigger: null,
    cleanBlock: null,
    drawImage: null,
    toggleBlockquote: null,
    toggleOrderedList: null,
    toggleUnorderedList: null,
    toggleCodeBlock: null,
    togglePreview: null,
    toggleSideBySide: null,
    toggleFullScreen: null,
  };

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
