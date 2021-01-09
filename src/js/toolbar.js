import highlight from "./highlight";
import newline from "./newline";

export default [
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
  highlight,
  "|",
  "quote",
  "unordered-list",
  "ordered-list",
  "|",
  newline,
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
