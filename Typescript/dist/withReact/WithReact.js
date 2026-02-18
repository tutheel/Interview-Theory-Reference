"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Button(props) {
    if (!props.disabled) {
        props.onClick();
    }
    return `<button>${props.label}</button>`;
}
const rendered = Button({
    label: "Save",
    onClick: () => console.log("Clicked from typed props")
});
console.log("Rendered output:", rendered);
