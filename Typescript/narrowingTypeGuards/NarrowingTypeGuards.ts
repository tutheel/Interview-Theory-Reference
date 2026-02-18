export {};

interface Cat {
  kind: "cat";
  meow: () => void;
}

interface Dog {
  kind: "dog";
  bark: () => void;
}

type Pet = Cat | Dog;

function isCat(pet: Pet): pet is Cat {
  return pet.kind === "cat";
}

function speak(pet: Pet): void {
  if (isCat(pet)) {
    pet.meow();
  } else {
    pet.bark();
  }
}

function printLength(value: string | string[]): void {
  if (Array.isArray(value)) {
    console.log("Array length:", value.length);
  } else {
    console.log("String length:", value.length);
  }
}

const kitty: Cat = {
  kind: "cat",
  meow: () => console.log("Meow")
};

const doggy: Dog = {
  kind: "dog",
  bark: () => console.log("Woof")
};

speak(kitty);
speak(doggy);
printLength("typescript");
printLength(["a", "b", "c"]);
