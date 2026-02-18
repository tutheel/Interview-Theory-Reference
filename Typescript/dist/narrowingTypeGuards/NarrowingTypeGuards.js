"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isCat(pet) {
    return pet.kind === "cat";
}
function speak(pet) {
    if (isCat(pet)) {
        pet.meow();
    }
    else {
        pet.bark();
    }
}
function printLength(value) {
    if (Array.isArray(value)) {
        console.log("Array length:", value.length);
    }
    else {
        console.log("String length:", value.length);
    }
}
const kitty = {
    kind: "cat",
    meow: () => console.log("Meow")
};
const doggy = {
    kind: "dog",
    bark: () => console.log("Woof")
};
speak(kitty);
speak(doggy);
printLength("typescript");
printLength(["a", "b", "c"]);
