import createEditor from "./editor";

export default class EditorsManager {
  constructor() {
    this.editors = new Map();
  }

  addEditor(textareas) {
    textareas.forEach((textarea) => {
      if (!textarea.id) {
        const id = `ta${Date.now()}`;
        // eslint-disable-next-line no-param-reassign
        textarea.id = id;
        createEditor(id, textarea);
        this.editors.set(id, textarea);
      }
    });
  }

  removeEditor(textareas) {
    textareas.forEach((textarea) => {
      if (this.editors.has(textarea.id)) {
        this.editors.delete(textarea.id);
      }
    });
  }
}
