const addNewLine = (editor) => {
  const cm = editor.codemirror;
  const newLine = "  \n";
  cm.replaceSelection(newLine);
  cm.focus();
};

export default {
  name: "new-line",
  action: addNewLine,
  className: "fa fa-paragraph",
  title: "New line",
};
