export {};

type LodashLike = {
  capitalize: (value: string) => string;
};

const lodashMock: LodashLike = {
  capitalize: (value) => value.charAt(0).toUpperCase() + value.slice(1)
};

const installHint = "npm i -D @types/lodash";

console.log("DefinitelyTyped install example:", installHint);
console.log("Mock third-party typed call:", lodashMock.capitalize("typescript"));
