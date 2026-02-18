export {};

type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

function Button(props: ButtonProps): string {
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
