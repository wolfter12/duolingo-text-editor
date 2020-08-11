import createEditor from "./editor";

export default class EditorsManager {
  constructor() {
    this.editors = new Map();
  }

  addEditor(textareas) {
    textareas.forEach((textarea) => {
      if (!textarea.dataset.editorId) {
        const dataEditorId = `ta${Date.now()}`;
        // eslint-disable-next-line no-param-reassign
        textarea.dataset.editorId = dataEditorId;
        const newEditorOptions = {
          dataEditorId,
          element: textarea,
          focus: false,
        };
        if (this.editors.size) {
          newEditorOptions.focus = true;
        }
        createEditor(newEditorOptions);
        this.editors.set(dataEditorId, textarea);
      }
    });
  }

  removeEditor(textareas) {
    textareas.forEach((textarea) => {
      if (this.editors.has(textarea.dataset.editorID)) {
        this.editors.delete(textarea.dataset.editorID);
      }
    });
  }
}
