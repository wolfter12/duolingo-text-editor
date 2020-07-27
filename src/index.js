"use strict";

import "./css/style.css";

let EasyMDE = require("easymde_duolingo");
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
            code: "`",
            italic: "_",
        },
        insertTexts: {
            horizontalRule: ['', '\n- - -\n']
        },
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
                    "heading-6"
                ]
            },
            "heading-smaller",
            "heading-bigger",
            "|",
            "quote",
            {
                name: "highlight",
                action: EasyMDE.toggleCodeBlock,
                className: "fa fa-pencil",
                title: "Highlight"
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
            "preview"
        ],
        spellChecker: false,
        status: false,
    });

    // TODO: Check if "UIEvents" is the most optimal option
    easyMDE.codemirror.on("change", function () {
        element.innerHTML = element.value;
        let event = document.createEvent("UIEvents");
        event.initUIEvent("change", true, true);
        element.dispatchEvent(event);
    });

    return easyMDE;
}