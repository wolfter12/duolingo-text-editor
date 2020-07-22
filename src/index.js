"use strict";

import "./css/style.css";

let EasyMDE = require("easymde");
let editors = new Map();
const targetNode = document.querySelector("#root");
const observerOptions = {
    childList: true,
    subtree: true
};
const observer = new MutationObserver(onMutation);

observer.observe(targetNode, observerOptions);

function buildEditor(textareas) {
    textareas.forEach(textarea => {
        if (!textarea.id) {
            let id;
            let newEditor;

            id = generateID();
            textarea.id = id;
            // stop observing, it needs to prevent recursive loop of mutationObserver
            disableObserver();
            newEditor = createEditor(id, textarea);
            editors.set(id, newEditor);
            // start observing
            enableObserver();
        }
    });
}

function removeEditor(textareas) {
    textareas.forEach(textarea => {
        if (editors.has(textarea.id)) {
            editors.delete(textarea.id);
        }
    });
}

function generateID() {
    return "ta" + Date.now();
}

// TODO: Create function for repetitive actions - addedNodes and removedNodes
function onMutation(mutations) {
    const ADDED_TEXTAREAS = [];
    const REMOVED_TEXTAREAS = [];

    for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
            if (!node.tagName) continue; // not an element
            if (node.tagName == "TEXTAREA") {
                ADDED_TEXTAREAS.push(node);
            } else if (node.firstElementChild) {
                ADDED_TEXTAREAS.push(...node.getElementsByTagName("textarea"));
            }
        }

        for (let node of mutation.removedNodes) {
            if (!node.tagName) continue; // not an element
            if (node.tagName == "TEXTAREA") {
                REMOVED_TEXTAREAS.push(node);
            } else if (node.firstElementChild) {
                REMOVED_TEXTAREAS.push(...node.getElementsByTagName("textarea"));
            }
        }
    }

    if (ADDED_TEXTAREAS.length) {
        buildEditor(ADDED_TEXTAREAS);
    }

    if (REMOVED_TEXTAREAS.length) {
        removeEditor(REMOVED_TEXTAREAS);
    }
}

function disableObserver() {
    observer.disconnect();
}

function enableObserver() {
    observer.observe(targetNode, observerOptions);
}

function createEditor(id, element) {
    let easyMDE = new EasyMDE({
        element: document.querySelector("#" + id),
        autoDownloadFontAwesome: false,
        forceSync: true,
        autosave: {
            enabled: false
        },
        blockStyles: {
            bold: "**",
            italic: "_",
        },
        insertTexts: {
            horizontalRule: ["\n---\n"]
        },
        toolbar: [
            "bold",
            "italic",
            "strikethrough",
            "|",
            "heading",
            "heading-smaller",
            "heading-bigger",
            "|",
            "quote",
            "unordered-list",
            "ordered-list",
            "|",
            "link",
            "image",
            "|",
            {
                name: "highlight",
                action: highlightedText,
                className: "fa fa-pencil",
                title: "Highlight"
            },
            "horizontal-rule",
            "|",
            "undo",
            "redo",
            "|",
            "preview"
        ],
        spellChecker: false,
        status: false,
    });

    // TODO: Simplify the function
    function highlightedText(editor) {
        let cm = editor.codemirror;
        let lineNumber = cm.getCursor().line;
        let line = cm.getLine(lineNumber);
        let anchor;
        let head;
        let text;
        let output = "";

        function checkBrackets(line, anchor, head) {
            let startCh = anchor.ch;
            let endCh = head.ch;

            if (line.charAt(startCh - 1) === "`" && line.charAt(endCh) === "`") {
                return true;
            }
            return false;
        }

        function getWordWithBrackets(line, anchor, head) {
            let startLine = anchor.line;
            let endLine = head.line;
            let startCh = anchor.ch;
            let endCh = head.ch;

            while (startCh !== 0 && line.charAt(startCh - 1) !== " ") {
                startCh--;
            }

            while (endCh !== line.length && line.charAt(endCh) !== " ") {
                endCh++;
            }

            return {
                anchor: { line: startLine, ch: startCh },
                head: { line: endLine, ch: endCh }
            };
        }

        function getRangeUnderCursor() {
            let lineNumber = cm.getCursor().line;
            let charNumber = cm.getCursor().ch;
            let options = { line: lineNumber, ch: charNumber };
            let wordAnchor = cm.findWordAt(options).anchor.ch;
            let wordHead = cm.findWordAt(options).head.ch;

            return {
                anchor: { line: lineNumber, ch: wordAnchor },
                head: { line: lineNumber, ch: wordHead }
            };
        }

        function getSelectedText() {
            return cm.getSelection() || "";
        }

        if (cm.somethingSelected()) {
            anchor = cm.getCursor(true);
            head = cm.getCursor(false);
        } else {
            anchor = getRangeUnderCursor().anchor;
            head = getRangeUnderCursor().head;
        }

        if (checkBrackets(line, anchor, head)) {
            let newAnchor = getWordWithBrackets(line, anchor, head).anchor;
            head = getWordWithBrackets(line, anchor, head).head;
            anchor = newAnchor;
        }

        cm.setSelection(anchor, head);
        text = getSelectedText();
        output = "";

        if (text.length >= 2 && text.charAt(0) === "`" && text.charAt(text.length - 1) === "`") {
            output = text.slice(1, -1);
            cm.replaceSelection(output);
            head.ch = head.ch - 2;
        } else {
            output = "`" + text + "`";
            cm.replaceSelection(output);
            anchor.ch = anchor.ch + 1;
            head.ch = head.ch + 1;
        }
        cm.setSelection(anchor, head);
    }

    // TODO: Check if "UIEvents" is the most optimal option
    easyMDE.codemirror.on("change", function () {
        element.innerHTML = element.value;
        let event = document.createEvent("UIEvents");
        event.initUIEvent("change", true, true);
        element.dispatchEvent(event);
    });

    return easyMDE;
}