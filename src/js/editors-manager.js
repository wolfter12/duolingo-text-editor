import createEditor from "./editor";

console.log("editors-manager");

export default class EditorsManager {
  constructor() {
    this.editors = new Map();
  }

  addEditor(textareas) {
    textareas.forEach((textarea) => {
      if (!textarea.id) {
        console.log("add editor", this.editors);
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
        console.log("remove editor", this.editors);
        this.editors.delete(textarea.id);
      }
    });
  }
}
