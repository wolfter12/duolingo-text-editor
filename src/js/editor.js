import "../scss/style.scss";

import clearEditorOnSubmit from "./on-submit";

const EasyMDE = require("easymde_duolingo");

export default function createEditor(id, element) {
  const target = document.querySelector(`#${id}`);

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
    element.innerHTML = element.value;
    const event = document.createEvent("UIEvents");
    event.initUIEvent("change", true, true);
    element.dispatchEvent(event);
  });

  function clearEditor() {
    easyMDE.codemirror.setValue("");
  }

  clearEditorOnSubmit(target, clearEditor);

  easyMDE.codemirror.focus();

  return easyMDE;
}
