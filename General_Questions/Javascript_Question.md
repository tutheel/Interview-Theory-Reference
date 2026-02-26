# JavaScript Interview Q&A (Core Concepts) — 38 Questions

## 1) What is the difference between `var`, `let`, and `const`?

**Answer:**

- **`var`**
  - Function-scoped (or global-scoped if declared outside a function)
  - Can be **redeclared** and **reassigned**
  - Hoisted and initialized with `undefined`
- **`let`**
  - Block-scoped
  - Can be **reassigned**, but not redeclared in the same scope
  - Hoisted but in **TDZ** until declaration
- **`const`**
  - Block-scoped
  - Cannot be **reassigned** (must be initialized at declaration)
  - Hoisted but in **TDZ**
  - For objects/arrays, the **reference is constant**, but internal values can still change

```js
var a = 10;
var a = 20; // ✅ allowed

let b = 10;
// let b = 20; // ❌ SyntaxError (same scope)
b = 20; // ✅ allowed

const c = 10;
// c = 20; // ❌ TypeError

const obj = { name: "Sushil" };
obj.name = "Patil"; // ✅ allowed (mutation of object)
```

---

## 2) What is hoisting in JavaScript, and what exactly gets hoisted?

**Answer:**

**Hoisting** is JavaScript’s behavior of moving declarations to the top of their scope during the creation phase (before code executes).

### What gets hoisted?
- **Function declarations** → hoisted **with full function body**
- **`var` declarations** → hoisted and initialized as `undefined`
- **`let` / `const` declarations** → hoisted, but **not initialized** (TDZ)

```js
console.log(x); // undefined
var x = 5;

sayHi(); // ✅ Works
function sayHi() {
  console.log("Hi");
}

// console.log(y); // ❌ ReferenceError (TDZ)
let y = 10;
```

---

## 3) What is the Temporal Dead Zone (TDZ)?

**Answer:**

The **TDZ** is the time between entering a scope and the point where a `let`/`const` variable is declared.  
During this time, accessing the variable throws a **ReferenceError**.

```js
{
  // TDZ starts
  // console.log(name); // ❌ ReferenceError
  let name = "Sushil"; // TDZ ends here
  console.log(name); // ✅ "Sushil"
}
```

---

## 4) What is the difference between `==` and `===`?

**Answer:**

- **`==` (loose equality)**: compares values **after type coercion**
- **`===` (strict equality)**: compares **value + type**, no coercion

```js
5 == "5";   // true  (string converted to number)
5 === "5";  // false (different types)

null == undefined;   // true
null === undefined;  // false
```

**Interview tip:** Prefer `===` in most cases for predictable behavior.

---

## 5) What are truthy and falsy values in JavaScript?

**Answer:**

In condition checks (`if`, `while`, etc.), values are converted to boolean.

### Falsy values (only these are falsy):
- `false`
- `0`
- `-0`
- `0n`
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

Everything else is **truthy** (including `"0"`, `"false"`, `[]`, `{}`).

```js
if ("0") console.log("truthy"); // ✅
if ([]) console.log("truthy");  // ✅
if ({}) console.log("truthy");  // ✅
```

---

## 6) What is type coercion? Give examples of implicit coercion.

**Answer:**

**Type coercion** is automatic type conversion by JavaScript.

### Implicit coercion examples:
```js
"5" + 1;   // "51"  (number -> string)
"5" - 1;   // 4     (string -> number)
true + 1;  // 2     (true -> 1)
false + 1; // 1     (false -> 0)

"5" == 5;  // true (coercion in loose equality)
```

**Important:** `+` often does string concatenation, while `-`, `*`, `/` try numeric conversion.

---

## 7) What does `typeof null` return, and why is it considered a historical quirk?

**Answer:**

```js
typeof null; // "object"
```

This is a **historical bug/quirk** from early JavaScript implementation.  
`null` is a primitive value, but `typeof null` incorrectly returns `"object"` for backward compatibility (it can’t be changed now without breaking old code).

---

## 8) What is the difference between `null` and `undefined`?

**Answer:**

- **`undefined`** = value is **not assigned** / missing by default
- **`null`** = value is **intentionally empty** (set by developer)

```js
let a;
console.log(a); // undefined

let b = null;
console.log(b); // null
```

### Common interview explanation:
- `undefined` → “not initialized”
- `null` → “intentionally no value”

---

## 9) What is `NaN` and how do you correctly check for it?

**Answer:**

`NaN` means **“Not-a-Number”**, but its type is still `number`.

```js
typeof NaN; // "number"
```

### Correct checks:
- `Number.isNaN(value)` ✅ (best)
- `Object.is(value, NaN)` ✅

```js
Number.isNaN(NaN); // true
Object.is(NaN, NaN); // true
```

**Why not `value === NaN`?**  
Because `NaN` is the only value not equal to itself.

```js
NaN === NaN; // false
```

---

## 10) What is the difference between `isNaN()` and `Number.isNaN()`?

**Answer:**

- **`isNaN()`** → converts value to number first (can be misleading)
- **`Number.isNaN()`** → checks only if value is actually `NaN` (strict)

```js
isNaN("hello");          // true   (because Number("hello") => NaN)
Number.isNaN("hello");   // false  (string is not NaN)

isNaN(NaN);              // true
Number.isNaN(NaN);       // true
```

**Interview tip:** Prefer `Number.isNaN()`.

---

## 11) What is the difference between `parseInt()`, `parseFloat()`, and `Number()`?

**Answer:**

- **`parseInt(str, 10)`** → parses integer until invalid char
- **`parseFloat(str)`** → parses decimal until invalid char
- **`Number(value)`** → converts whole value; fails (`NaN`) if invalid chars exist

```js
parseInt("123px", 10);  // 123
parseFloat("12.34px");  // 12.34
Number("123");          // 123
Number("123px");        // NaN
```

### Extra:
```js
parseInt("08", 10); // 8 (always pass radix 10)
Number("");         // 0
parseInt("");       // NaN
```

---

## 12) What is the difference between primitive values and reference values?

**Answer:**

### Primitive values (immutable, stored/copied by value)
- `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`

### Reference values (objects)
- `Object`, `Array`, `Function`, `Date`, `Map`, `Set`, etc.

When assigned/copied:
- Primitive → actual value copied
- Object → reference (address-like value) copied

```js
let a = 10;
let b = a;
b = 20;
console.log(a); // 10

let obj1 = { x: 1 };
let obj2 = obj1;
obj2.x = 99;
console.log(obj1.x); // 99
```

---

## 13) What happens when you assign an object to another variable?

**Answer:**

You copy the **reference**, not the object itself.  
Both variables point to the **same object in memory**.

```js
const user1 = { name: "A" };
const user2 = user1;

user2.name = "B";

console.log(user1.name); // "B"
console.log(user1 === user2); // true
```

---

## 14) What is pass-by-value vs pass-by-reference (and how does JS actually pass arguments)?

**Answer:**

JavaScript is technically **pass-by-value**.

But for objects, the **value being passed is the reference** (often called **call-by-sharing**).

### Meaning:
- Reassigning parameter does **not** affect original object reference
- Mutating object properties **does** affect original object

```js
function change(obj) {
  obj.name = "Changed"; // ✅ mutates original
}

function reassign(obj) {
  obj = { name: "New Object" }; // ❌ only local reassignment
}

const user = { name: "Sushil" };

change(user);
console.log(user.name); // "Changed"

reassign(user);
console.log(user.name); // still "Changed"
```

---

## 15) What are template literals and why are they useful?

**Answer:**

Template literals use backticks `` ` ``, and support:
- String interpolation `${...}`
- Multiline strings
- Easier formatting

```js
const name = "Sushil";
const score = 95;

const msg = `Hello ${name},
Your score is ${score}.`;

console.log(msg);
```

They improve readability vs string concatenation.

---

## 16) What are default parameters in functions?

**Answer:**

Default parameters let you set fallback values when arguments are `undefined`.

```js
function greet(name = "Guest") {
  return `Hello, ${name}`;
}

greet();         // "Hello, Guest"
greet("Sushil"); // "Hello, Sushil"
```

### Note:
Default value applies only when argument is `undefined`, not `null`.

```js
greet(undefined); // "Hello, Guest"
greet(null);      // "Hello, null"
```

---

## 17) What are rest parameters (`...args`) and how are they different from `arguments`?

**Answer:**

### Rest parameters (`...args`)
- Collect remaining arguments into a **real array**
- Works in normal and arrow functions
- Supports array methods directly

### `arguments` (older)
- Array-like object (not real array)
- Not available in arrow functions
- Contains all passed arguments

```js
function sum(...args) {
  return args.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3)); // 6
```

```js
function oldStyle() {
  console.log(arguments); // array-like
}
```

---

## 18) What is the spread operator and where can it be used?

**Answer:**

Spread (`...`) expands iterable/object values.

### Common uses:
1. **Function calls**
2. **Array copy/merge**
3. **Object copy/merge**

```js
const nums = [1, 2, 3];
console.log(Math.max(...nums)); // 3

const a = [1, 2];
const b = [...a, 3, 4]; // [1, 2, 3, 4]

const user = { name: "Sushil" };
const updated = { ...user, city: "Bangalore" };
```

**Note:** Spread creates a **shallow copy**.

---

## 19) What is destructuring in arrays and objects?

**Answer:**

Destructuring is a concise way to extract values from arrays/objects into variables.

### Array destructuring
```js
const arr = [10, 20, 30];
const [first, second] = arr;
console.log(first, second); // 10 20
```

### Object destructuring
```js
const user = { name: "Sushil", age: 25 };
const { name, age } = user;
console.log(name, age);
```

### Renaming + default values
```js
const { name: userName, city = "Unknown" } = user;
```

---

## 20) What is optional chaining (`?.`) and nullish coalescing (`??`)?

**Answer:**

### Optional chaining (`?.`)
Safely accesses nested properties/methods without throwing if a value is `null`/`undefined`.

```js
const user = {};
console.log(user.address?.city); // undefined (no error)
```

### Nullish coalescing (`??`)
Returns right side **only if left side is `null` or `undefined`**.

```js
const count = 0;
console.log(count ?? 10); // 0 (preserved)

const name = null;
console.log(name ?? "Guest"); // "Guest"
```

---

## 21) What is the difference between `||` and `??`?

**Answer:**

- **`||`** returns fallback for **any falsy value**
- **`??`** returns fallback only for **`null` or `undefined`**

```js
0 || 100;     // 100  ❗ (0 is falsy)
0 ?? 100;     // 0    ✅

"" || "N/A";  // "N/A"
"" ?? "N/A";  // ""   ✅
```

**Interview tip:** Use `??` when `0`, `false`, or `""` are valid values.

---

## 22) What are short-circuiting operators and how do they work?

**Answer:**

Short-circuiting means JavaScript may stop evaluating early once result is known.

### `&&` (AND)
- Returns first falsy value, else last value

```js
true && "Hi";   // "Hi"
false && "Hi";  // false
```

### `||` (OR)
- Returns first truthy value, else last value

```js
"" || "Default"; // "Default"
"Hi" || "X";     // "Hi"
```

### `??` (Nullish coalescing)
- Returns right side only if left is `null`/`undefined`

```js
null ?? "Fallback"; // "Fallback"
0 ?? 10;            // 0
```

---

## 23) What is the difference between function declaration and function expression?

**Answer:**

### Function declaration
- Named function defined with `function name() {}`
- Fully hoisted (can call before definition)

```js
sayHello(); // ✅ works
function sayHello() {
  console.log("Hello");
}
```

### Function expression
- Function assigned to variable
- Variable is hoisted, but function value is not usable before assignment (`let`/`const` -> TDZ)

```js
const greet = function () {
  console.log("Hi");
};

greet(); // ✅ after assignment
```

---

## 24) What is an arrow function and how is it different from a normal function?

**Answer:**

Arrow functions are shorter syntax, but behavior differs.

### Key differences:
1. **No own `this`** (lexically inherits `this`)
2. **No own `arguments`**
3. **Cannot be used as constructors** (`new` fails)
4. Not ideal for object methods when you need dynamic `this`

```js
const obj = {
  name: "Sushil",
  normal() {
    console.log(this.name); // "Sushil"
  },
  arrow: () => {
    console.log(this.name); // usually undefined (depends on outer scope)
  }
};

obj.normal();
obj.arrow();
```

---

## 25) What is lexical scope in JavaScript?

**Answer:**

Lexical scope means scope is determined by **where code is written**, not where it is called.

Inner functions can access variables from outer scopes.

```js
function outer() {
  const name = "Sushil";

  function inner() {
    console.log(name); // can access outer variable
  }

  inner();
}

outer();
```

---

## 26) What is block scope vs function scope?

**Answer:**

- **Block scope** → variables exist only inside `{ }` block (`let`, `const`)
- **Function scope** → variables exist anywhere inside function (`var`)

```js
if (true) {
  let a = 10;
  const b = 20;
  var c = 30;
}

// console.log(a); // ❌
// console.log(b); // ❌
console.log(c); // ✅ 30 (var is not block-scoped)
```

---

## 27) What is a closure in JavaScript?

**Answer:**

A **closure** is when a function remembers and can access variables from its **lexical scope**, even after the outer function has finished executing.

```js
function counter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const inc = counter();
console.log(inc()); // 1
console.log(inc()); // 2
```

### Why useful?
- Data privacy
- State retention
- Function factories
- Memoization/caching

---

## 28) What are Immediately Invoked Function Expressions (IIFE) and when are they useful?

**Answer:**

An **IIFE** is a function that runs immediately after being defined.

```js
(function () {
  console.log("Runs immediately");
})();
```

### Common uses (especially older JS):
- Create private scope
- Avoid polluting global variables
- Module-like encapsulation before ES modules

```js
const result = (() => {
  const secret = 42;
  return secret * 2;
})();

console.log(result); // 84
```

---

## 29) What is strict mode (`'use strict'`) and what problems does it help prevent?

**Answer:**

Strict mode enables a stricter parsing/execution mode in JavaScript.

```js
"use strict";
```

### It helps prevent:
- Accidental globals
- Silent errors becoming thrown errors
- Duplicate parameter names (in many cases)
- Unsafe `this` behavior in functions
- Some reserved keyword misuse

```js
"use strict";

// x = 10; // ❌ ReferenceError (without declaration)
let x = 10;
```

**Interview tip:** ES modules are strict by default.

---

## 30) What is the difference between mutable and immutable operations in JS?

**Answer:**

- **Mutable operation** changes the original data
- **Immutable operation** returns new data, leaving original unchanged

### Mutable examples
- `push`, `pop`, `splice`, `sort`, direct object property assignment

### Immutable examples
- `map`, `filter`, `slice`, spread (`...`), `concat`

```js
const arr = [1, 2, 3];

arr.push(4); // mutable (arr changes)

const arr2 = [...arr, 5]; // immutable style (new array)
```

---

## 31) What are common immutable update patterns for arrays and objects?

**Answer:**

### Arrays
- Add item: `[...arr, newItem]`
- Remove item: `arr.filter(...)`
- Update item: `arr.map(...)`

```js
const todos = [{ id: 1, done: false }, { id: 2, done: false }];

const updated = todos.map(todo =>
  todo.id === 2 ? { ...todo, done: true } : todo
);
```

### Objects
- Update property: `{ ...obj, key: newValue }`
- Nested update (careful: copy each level)

```js
const state = {
  user: { name: "Sushil", address: { city: "BLR" } }
};

const nextState = {
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: "Mumbai"
    }
  }
};
```

---

## 32) What is the difference between shallow copy and deep copy?

**Answer:**

### Shallow copy
Copies only the **top level**. Nested objects/arrays are still shared references.

### Deep copy
Copies all nested levels recursively (independent copy).

```js
const original = { a: 1, nested: { b: 2 } };

const shallow = { ...original };
shallow.nested.b = 99;

console.log(original.nested.b); // 99 ❗ shared nested reference
```

---

## 33) How can you deep clone an object in JavaScript (and what are the caveats)?

**Answer:**

### Best modern option (for many cases): `structuredClone()`
```js
const cloned = structuredClone(original);
```

### Pros
- Supports many built-in types
- Handles circular references

### Caveats
- Does **not** clone functions
- Some special objects/environment-specific values may fail
- Class instance behavior/method expectations can be tricky depending on structure

### Alternatives
- `JSON.parse(JSON.stringify(obj))` (limited)
- Custom recursive clone
- Libraries like Lodash (`_.cloneDeep`)

---

## 34) What is `JSON.stringify()` / `JSON.parse()` cloning and when does it fail?

**Answer:**

A quick way to clone plain JSON-safe objects:

```js
const clone = JSON.parse(JSON.stringify(obj));
```

### Fails / loses data for:
- `undefined` (dropped)
- `function` (dropped)
- `symbol` (dropped)
- `Date` (converted to string)
- `Map` / `Set` (not preserved properly)
- `BigInt` (throws error)
- `NaN`, `Infinity` (become `null`)
- Circular references (throws error)

```js
const obj = { date: new Date(), x: undefined };
const clone = JSON.parse(JSON.stringify(obj));

console.log(typeof clone.date); // "string"
```

---

## 35) What is the difference between `slice`, `splice`, and `substring` / `substr` (legacy)?

**Answer:**

### `slice(start, end)`
- Works on arrays and strings
- Returns a **new** portion
- Does **not mutate**
- Supports negative indexes

```js
const arr = [1, 2, 3, 4];
arr.slice(1, 3); // [2, 3]
```

### `splice(start, deleteCount, ...items)`
- Array only
- **Mutates** original array
- Can add/remove elements

```js
const a = [1, 2, 3, 4];
a.splice(1, 2, 99); // removes [2,3], inserts 99
console.log(a); // [1, 99, 4]
```

### `substring(start, end)` (string)
- Returns part of string
- No negative indexes (negative treated as 0)
- If `start > end`, it swaps them

```js
"hello".substring(1, 4); // "ell"
```

### `substr(start, length)` (legacy/deprecated)
- Uses length instead of end index
- Avoid in modern code

```js
"hello".substr(1, 3); // "ell" (legacy)
```

---

## 36) What is the difference between `map`, `forEach`, `filter`, `reduce`, and `find`?

**Answer:**

### `forEach`
- Iterates for side effects
- Returns `undefined`

```js
[1, 2, 3].forEach(n => console.log(n));
```

### `map`
- Transforms each item
- Returns new array (same length)

```js
const doubled = [1, 2, 3].map(n => n * 2); // [2, 4, 6]
```

### `filter`
- Keeps items matching condition
- Returns new array (possibly shorter)

```js
const even = [1, 2, 3, 4].filter(n => n % 2 === 0); // [2, 4]
```

### `find`
- Returns first matching item
- Returns `undefined` if none

```js
const firstEven = [1, 3, 4, 6].find(n => n % 2 === 0); // 4
```

### `reduce`
- Accumulates array into single value (sum, object, grouped result, etc.)

```js
const sum = [1, 2, 3].reduce((acc, n) => acc + n, 0); // 6
```

**Interview tip:** Use the method that matches intent (readability matters).

---

## 37) What is the difference between `find` and `findIndex`?

**Answer:**

- **`find()`** → returns the **element**
- **`findIndex()`** → returns the **index**
- If not found:
  - `find()` → `undefined`
  - `findIndex()` → `-1`

```js
const users = [{ id: 1 }, { id: 2 }];

users.find(u => u.id === 2);       // { id: 2 }
users.findIndex(u => u.id === 2);  // 1

users.find(u => u.id === 99);      // undefined
users.findIndex(u => u.id === 99); // -1
```

---

## 38) What is the difference between `some` and `every`?

**Answer:**

- **`some()`** → returns `true` if **at least one** element matches
- **`every()`** → returns `true` only if **all** elements match

```js
const nums = [2, 4, 6, 7];

nums.some(n => n % 2 !== 0);  // true  (7 is odd)
nums.every(n => n % 2 === 0); // false (7 breaks condition)
```

### Mental model:
- `some` = **OR**
- `every` = **AND**


---

# 2. Functions, objects, prototypes, OOP, modules

### 1) What is a first-class function?

**Answer:**

In JavaScript, functions are **first-class values**, which means they can be:
- Assigned to variables
- Passed as arguments
- Returned from other functions
- Stored in objects/arrays

```js
const sayHi = function () {
  return "Hi";
};

function run(fn) {
  console.log(fn());
}

run(sayHi); // "Hi"
```

---

### 2) What is a higher-order function?

**Answer:**

A **higher-order function (HOF)** is a function that:
- Takes one or more functions as arguments, or
- Returns a function

```js
function multiplier(factor) {
  return function (num) {
    return num * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10
```

`map`, `filter`, and `reduce` are common built-in HOFs.

---

### 3) What is callback hell and how do you avoid it?

**Answer:**

**Callback hell** is deeply nested callbacks that make code hard to read, maintain, and handle errors.

```js
getUser(id, (user) => {
  getOrders(user, (orders) => {
    getPayment(orders, (payment) => {
      // deeply nested
    });
  });
});
```

### How to avoid:
- Break logic into named functions
- Use Promises (`.then/.catch`)
- Prefer `async/await` for linear flow

---

### 4) What is the this keyword in JavaScript?

**Answer:**

`this` refers to the object bound to the current function call context.  
It is determined by **how a function is called**, not where it is defined (except arrow functions).

```js
const user = {
  name: "Sushil",
  greet() {
    console.log(this.name);
  }
};

user.greet(); // "Sushil"
```

---

### 5) How is this determined in regular functions vs arrow functions?

**Answer:**

- **Regular function**: `this` is dynamic (depends on call-site)
- **Arrow function**: no own `this`; it lexically captures `this` from outer scope

```js
const obj = {
  name: "A",
  regular() {
    console.log(this.name); // "A"
  },
  arrow: () => {
    console.log(this.name); // from outer scope, usually undefined
  }
};
```

---

### 6) What do call, apply, and bind do?

**Answer:**

They control `this` for function execution.

- `call(thisArg, a, b)` -> invokes immediately with args list
- `apply(thisArg, [a, b])` -> invokes immediately with args array
- `bind(thisArg, a, b)` -> returns new function with bound `this` (and optional preset args)

```js
function intro(city) {
  return `${this.name} from ${city}`;
}

const user = { name: "Sushil" };

intro.call(user, "Pune");
intro.apply(user, ["Pune"]);
const bound = intro.bind(user, "Pune");
bound();
```

---

### 7) What is function borrowing using call/apply?

**Answer:**

Function borrowing means using a method from one object for another object by setting `this` with `call/apply`.

```js
const person1 = {
  first: "Sushil",
  fullName() {
    return this.first;
  }
};

const person2 = { first: "Patil" };

console.log(person1.fullName.call(person2)); // "Patil"
```

---

### 8) What is method chaining and how would you implement chainable methods?

**Answer:**

Method chaining means calling multiple methods in a sequence on the same object.  
To make methods chainable, return `this` from each method.

```js
class Counter {
  constructor() {
    this.value = 0;
  }
  inc() {
    this.value++;
    return this;
  }
  dec() {
    this.value--;
    return this;
  }
}

const c = new Counter();
c.inc().inc().dec();
```

---

### 9) What is the new keyword doing internally when creating an object?

**Answer:**

`new` does this internally:
1. Creates a new empty object
2. Links it to constructor's `prototype`
3. Calls constructor with `this` = new object
4. Returns that object (unless constructor returns another object explicitly)

```js
function User(name) {
  this.name = name;
}
const u = new User("Sushil");
```

---

### 10) What is a constructor function?

**Answer:**

A constructor function is a regular function used with `new` to create multiple similar objects.

```js
function Car(brand) {
  this.brand = brand;
}

const c1 = new Car("Toyota");
const c2 = new Car("Honda");
```

By convention, constructor names start with a capital letter.

---

### 11) What is the difference between constructor functions and ES6 classes?

**Answer:**

ES6 classes are mostly syntactic sugar over prototype-based constructor functions, but with nicer syntax and safer defaults.

### Key differences:
- `class` must be called with `new`; calling without `new` throws
- Class methods are non-enumerable by default
- Class bodies run in strict mode
- Class declarations are hoisted but stay in TDZ before declaration

```js
class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hi ${this.name}`;
  }
}
```

---

### 12) What is the prototype chain in JavaScript?

**Answer:**

When you access a property, JS first checks the object itself.  
If not found, it looks up its prototype, then that prototype's prototype, and so on until `null`.

This lookup path is the **prototype chain**.

```js
const arr = [];
// arr -> Array.prototype -> Object.prototype -> null
```

---

### 13) What is __proto__ vs prototype?

**Answer:**

- `prototype`:
  - A property on constructor functions/classes
  - Used when creating instances with `new`
- `__proto__`:
  - A reference on object instances to their internal prototype (`[[Prototype]]`)

```js
function Person() {}
const p = new Person();

console.log(p.__proto__ === Person.prototype); // true
```

Interview note: prefer `Object.getPrototypeOf(obj)` over direct `__proto__`.

---

### 14) How does prototypal inheritance work in JavaScript?

**Answer:**

Objects inherit properties/methods from other objects via prototype links.

```js
const animal = {
  eat() {
    return "eating";
  }
};

const dog = Object.create(animal);
dog.bark = () => "woof";

console.log(dog.eat()); // inherited
```

---

### 15) What are static methods in classes?

**Answer:**

`static` methods belong to the class itself, not instances.

```js
class MathUtil {
  static add(a, b) {
    return a + b;
  }
}

MathUtil.add(2, 3); // 5
// new MathUtil().add(...) // not available
```

---

### 16) What are getters and setters in objects/classes?

**Answer:**

Getters and setters are special methods that let you read/write properties with function logic.

```js
class User {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value.trim();
  }
}
```

Useful for validation, formatting, and computed properties.

---

### 17) What are private fields in JavaScript classes (e.g., #count)?

**Answer:**

Private fields use `#` and are accessible only inside the class body.

```js
class Counter {
  #count = 0;

  inc() {
    this.#count++;
  }
  getCount() {
    return this.#count;
  }
}
```

They cannot be accessed as `obj.#count` outside the class.

---

### 18) What is object property enumeration, and what is the difference between enumerable and non-enumerable properties?

**Answer:**

Enumeration means listing object properties through loops/APIs.

- **Enumerable** properties show up in `for...in`, `Object.keys`, etc.
- **Non-enumerable** properties exist but are hidden from most enumeration APIs.

```js
const obj = {};
Object.defineProperty(obj, "hidden", {
  value: 123,
  enumerable: false
});

console.log(Object.keys(obj)); // []
```

---

### 19) What is the difference between Object.keys, Object.values, Object.entries, and for...in?

**Answer:**

- `Object.keys(obj)` -> array of own enumerable string keys
- `Object.values(obj)` -> array of own enumerable values
- `Object.entries(obj)` -> array of `[key, value]` pairs (own enumerable)
- `for...in` -> iterates enumerable string keys from object and its prototype chain

```js
for (const key in obj) {
  if (Object.hasOwn(obj, key)) {
    // own keys only
  }
}
```

---

### 20) What is the difference between Object.assign() and spread for object copying?

**Answer:**

Both are shallow copy patterns for own enumerable properties.

- `Object.assign(target, source)` mutates target and returns it
- `{ ...source }` creates a new object (common immutable style)

```js
const src = { a: 1 };
const a = Object.assign({}, src); // new via empty target
const b = { ...src }; // new object
```

Both are shallow, so nested objects are still shared references.

---

### 21) What does Object.freeze() do? How is it different from Object.seal()?

**Answer:**

- `Object.freeze(obj)`:
  - Cannot add/delete properties
  - Cannot change existing property values (writable false)
- `Object.seal(obj)`:
  - Cannot add/delete properties
  - Can still update existing writable properties

```js
const a = { x: 1 };
Object.seal(a);
a.x = 2; // allowed (if writable)

const b = { y: 1 };
Object.freeze(b);
b.y = 2; // ignored/throws in strict mode
```

Both are shallow.

---

### 22) What are Map and Set, and when would you prefer them over plain objects/arrays?

**Answer:**

- `Map`: key-value collection with keys of any type
- `Set`: collection of unique values

### Prefer `Map` when:
- Keys are not just strings/symbols
- You need frequent add/delete/lookups with predictable iteration order

### Prefer `Set` when:
- You need uniqueness checks quickly

```js
const ids = new Set([1, 2, 2, 3]); // {1,2,3}
const map = new Map([[{ id: 1 }, "user"]]);
```

---

### 23) What is the difference between WeakMap/WeakSet and Map/Set?

**Answer:**

- `WeakMap` keys must be objects (weakly referenced)
- `WeakSet` values must be objects (weakly referenced)
- Weak collections are not iterable and have no `size`
- If key object has no other references, it can be garbage collected

Use weak collections for metadata tied to object lifetimes (avoid memory leaks).

---

### 24) What is symbol type in JavaScript and where is it used?

**Answer:**

`Symbol` is a primitive type that creates unique identifiers.

```js
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false
```

### Common uses:
- Unique object keys (avoid collisions)
- Well-known symbols (like `Symbol.iterator`) to customize built-in behavior

---

### 25) What are iterables and iterators?

**Answer:**

- **Iterable**: object that implements `Symbol.iterator` and can be used in `for...of`
- **Iterator**: object with `next()` method returning `{ value, done }`

```js
const arr = [10, 20];
const it = arr[Symbol.iterator]();
console.log(it.next()); // { value: 10, done: false }
```

---

### 26) What is a generator function (function*) and when is it useful?

**Answer:**

A generator function (`function*`) returns an iterator and can pause/resume execution using `yield`.

```js
function* gen() {
  yield 1;
  yield 2;
}

for (const v of gen()) {
  console.log(v); // 1, 2
}
```

Useful for lazy sequences, custom iterators, and stateful iteration.

---

### 27) What are ES modules (import/export) and how are they different from CommonJS (require/module.exports)?

**Answer:**

### ES Modules (ESM)
- Use `import` / `export`
- Static structure (known at parse time)
- Support tree shaking better
- Native in modern browsers and Node

### CommonJS (CJS)
- Use `require` / `module.exports`
- Loaded dynamically at runtime
- Historically default in Node ecosystem

```js
// ESM
import { sum } from "./math.js";

// CJS
const { sum } = require("./math");
```

---

### 28) What is the difference between named export and default export?

**Answer:**

- **Named export**: export multiple bindings by name
- **Default export**: export one primary value per module

```js
// math.js
export const add = (a, b) => a + b;
export default function sub(a, b) {
  return a - b;
}

// import
import sub, { add } from "./math.js";
```

---

### 29) What are side effects in modules and why can they be problematic?

**Answer:**

A module side effect is code that runs immediately at import time (top-level effects), like modifying globals, starting timers, or making API calls.

### Problems:
- Hidden behavior and order dependency
- Harder testing and debugging
- Can block tree shaking and increase bundle size

Prefer explicit function calls for effects when possible.

---

### 30) What is tree shaking and how do ES modules help it?

**Answer:**

Tree shaking is build-time removal of unused code from bundles.

ES modules help because imports/exports are static, so bundlers can analyze which exports are unused and drop them.

```js
// utils.js
export const used = () => {};
export const unused = () => {};

// app.js
import { used } from "./utils.js";
```

A bundler can keep `used` and remove `unused` (if no side effects).

## 3. Async JavaScript, event loop, promises

### 1) What is synchronous vs asynchronous execution in JavaScript?

**Answer:**

- **Synchronous**: code runs line by line; each task blocks the next.
- **Asynchronous**: long tasks (timers, network, I/O) are scheduled, and JS continues running other code.

```js
console.log("A");
setTimeout(() => console.log("B"), 0); // async callback
console.log("C");
// Output: A, C, B
```

---

### 2) What is the JavaScript event loop?

**Answer:**

The event loop coordinates:
- Call stack (currently executing code)
- Web/Node APIs (timers, I/O)
- Queues (microtasks and macrotasks)

When the stack is empty, it moves queued tasks into execution order.

---

### 3) What is the call stack?

**Answer:**

The call stack is a LIFO structure that tracks function execution frames.

- Function call -> pushed to stack
- Function return -> popped from stack

If recursion is too deep, you get stack overflow.

```js
function a() { b(); }
function b() { c(); }
function c() { console.log("run"); }
a();
```

---

### 4) What is the task queue (macrotask queue) and microtask queue?

**Answer:**

- **Macrotask queue**: `setTimeout`, `setInterval`, I/O, UI events
- **Microtask queue**: `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver`

After each macrotask, JS drains all microtasks before taking the next macrotask.

---

### 5) What is the execution order between setTimeout, Promise.then, and queueMicrotask?

**Answer:**

`Promise.then` and `queueMicrotask` are microtasks; `setTimeout` is a macrotask.

Typical order:
1. Current sync code
2. All microtasks (FIFO)
3. Next macrotask (`setTimeout`)

```js
console.log("start");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
queueMicrotask(() => console.log("microtask"));
console.log("end");
// start, end, promise, microtask, timeout (promise/microtask order is insertion order)
```

---

### 6) What is process.nextTick() in Node.js and how is it different from Promise microtasks?

**Answer:**

In Node.js, `process.nextTick()` callbacks run **before** Promise microtasks after the current operation.

- `nextTick` queue has higher priority
- Overusing `nextTick` can starve I/O

```js
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));
// nextTick, then promise
```

---

### 7) What is a Promise and what problem does it solve?

**Answer:**

A Promise is an object representing eventual completion/failure of async work.

It solves:
- Callback nesting
- Better composability (`then`, `catch`, `all`, etc.)
- Centralized async error handling

```js
fetch("/api/user")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

---

### 8) What are the states of a Promise?

**Answer:**

Promise states:
- `pending` (initial)
- `fulfilled` (success)
- `rejected` (failure)

`fulfilled` and `rejected` are final (settled states).

---

### 9) What is the difference between resolve, reject, and throw inside async code?

**Answer:**

- `resolve(value)` -> fulfills a Promise
- `reject(error)` -> rejects a Promise
- `throw error`:
  - Inside Promise executor/`then`/`catch`/`async` function becomes rejection
  - In normal sync code, throws immediate exception

```js
new Promise((resolve, reject) => {
  if (Math.random() > 0.5) resolve("ok");
  else reject(new Error("fail"));
});
```

---

### 10) What does async/await do under the hood conceptually?

**Answer:**

`async/await` is syntax over Promises.

- `async` function always returns a Promise
- `await` pauses that function until the awaited Promise settles
- Remaining code resumes in a microtask

It makes async code look synchronous while staying non-blocking.

---

### 11) What is the difference between an async function and a normal function?

**Answer:**

- `async function` always returns a Promise
- Return value becomes resolved value
- Thrown error becomes rejected Promise
- `await` can be used only inside async functions (or top-level in ESM)

```js
async function f() {
  return 42;
}
f().then(console.log); // 42
```

---

### 12) What happens if you await a non-promise value?

**Answer:**

`await` wraps it with `Promise.resolve(value)`, so it resolves immediately (next microtask turn).

```js
async function f() {
  const x = await 10;
  console.log(x); // 10
}
```

---

### 13) What is the difference between return await and return in an async function?

**Answer:**

Both often produce same final result, but there is an important difference in error handling:

- `return promise` -> returns it directly
- `return await promise` -> waits inside current function, so local `try/catch` can catch rejection

```js
async function a() {
  try {
    return await Promise.reject(new Error("x"));
  } catch (e) {
    return "handled";
  }
}
```

---

### 14) What is promise chaining and why is it useful?

**Answer:**

Promise chaining means returning values/promises from `.then()` so each step feeds the next.

Benefits:
- Linear async flow
- Centralized error handling with one `.catch()`
- Better composition

```js
fetch("/user")
  .then((r) => r.json())
  .then((u) => fetch(`/orders/${u.id}`))
  .then((r) => r.json())
  .catch(console.error);
```

---

### 15) What are .then(), .catch(), and .finally() used for?

**Answer:**

- `.then(onFulfilled)` -> handle success
- `.catch(onRejected)` -> handle errors/rejections
- `.finally(onFinally)` -> run cleanup regardless of success/failure

```js
doWork()
  .then(handleData)
  .catch(handleError)
  .finally(() => setLoading(false));
```

---

### 16) What is the difference between Promise.all, Promise.allSettled, Promise.race, and Promise.any?

**Answer:**

- `Promise.all([...])`
  - Resolves when all resolve
  - Rejects fast on first rejection
- `Promise.allSettled([...])`
  - Waits for all settled
  - Returns status objects for each
- `Promise.race([...])`
  - Settles with first settled Promise (resolve or reject)
- `Promise.any([...])`
  - Resolves with first fulfilled Promise
  - Rejects only if all reject (`AggregateError`)

---

### 17) When should you use Promise.all vs sequential await in a loop?

**Answer:**

- Use `Promise.all` when operations are independent and can run in parallel.
- Use sequential `await` when order matters, each step depends on previous output, or to limit load.

```js
// Parallel
await Promise.all(ids.map((id) => fetchUser(id)));

// Sequential
for (const id of ids) {
  await fetchAndProcess(id);
}
```

---

### 18) What are common mistakes with forEach + async/await?

**Answer:**

`forEach` does not await async callbacks, so outer flow continues early.

```js
// Mistake
items.forEach(async (item) => {
  await save(item);
});
```

Use:
- `for...of` for sequential awaits
- `Promise.all(items.map(...))` for parallel awaits

---

### 19) What is unhandled promise rejection and how do you prevent it?

**Answer:**

Unhandled rejection means a Promise rejects without a `.catch()` (or surrounding `try/catch` with `await`).

Prevention:
- Always return/await Promises
- Add `.catch()` at chain end
- Use `try/catch` in async functions
- Add global handlers for logging as safety net

```js
process.on("unhandledRejection", (err) => {
  console.error("Unhandled:", err);
});
```

---

### 20) How do you handle errors in async/await code cleanly?

**Answer:**

Use `try/catch/finally`, and handle errors at the right layer.

```js
async function loadUser() {
  try {
    const res = await fetch("/api/user");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // log/transform/rethrow as needed
    throw err;
  } finally {
    // cleanup
  }
}
```

---

### 21) What is cancellation in async flows and how can AbortController help?

**Answer:**

Cancellation means stopping an in-flight async task when result is no longer needed (e.g., search input changed).

`AbortController` provides a signal that supported APIs (like `fetch`) can observe.

```js
const controller = new AbortController();
fetch("/api/data", { signal: controller.signal });
controller.abort(); // cancels request
```

---

### 22) What is debouncing and when would you use it?

**Answer:**

Debouncing delays execution until calls stop for a specified time.

Use for:
- Search input API calls
- Resize handlers
- Expensive validation on typing

```js
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
```

---

### 23) What is throttling and when would you use it?

**Answer:**

Throttling limits execution to at most once per interval.

Use for:
- Scroll/mousemove handlers
- Window resize updates
- Frequent events where periodic updates are enough

```js
function throttle(fn, wait) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    }
  };
}
```

---

### 24) What is rate limiting (API perspective) and how is it different from throttle/debounce?

**Answer:**

Rate limiting is usually a **server/API policy** that caps requests per client/time window (for abuse protection and fairness).

- Debounce/throttle are client-side event control patterns.
- Rate limiting enforces backend limits regardless of client behavior.

Common responses: `429 Too Many Requests` with retry headers.

---

### 25) How would you retry a failed async operation with exponential backoff?

**Answer:**

Retry transient failures with increasing delay: `base * 2^attempt` (plus jitter in real systems).

```js
async function retry(fn, retries = 3, base = 200) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries) throw err;
      await new Promise((r) => setTimeout(r, base * 2 ** i));
    }
  }
}
```

---

### 26) What is polling and when is it appropriate?

**Answer:**

Polling means repeatedly requesting data at fixed intervals.

Use when:
- Real-time push channel is unavailable
- Data freshness can tolerate interval delay
- Simpler implementation is preferred

Tradeoff: extra network load and stale windows between polls.

---

### 27) What is long polling vs WebSockets vs Server-Sent Events (high level)?

**Answer:**

- **Long polling**:
  - Client sends request; server holds until update/timeout, then client reconnects
  - Works over standard HTTP, but more overhead
- **WebSockets**:
  - Persistent full-duplex connection
  - Best for bi-directional real-time (chat, gaming)
- **SSE (Server-Sent Events)**:
  - Persistent server-to-client stream over HTTP
  - Simpler than WebSocket for one-way updates

---

### 28) How do you avoid race conditions in async UI/API code?

**Answer:**

Common patterns:
- Cancel previous request (`AbortController`)
- Track latest request id/version and ignore stale responses
- Serialize updates when order matters
- Use locks/queues for shared mutable state

```js
let reqId = 0;
async function search(q) {
  const id = ++reqId;
  const data = await fetch(`/api?q=${q}`).then((r) => r.json());
  if (id !== reqId) return; // stale response
  render(data);
}
```

---

### 29) What are memory leaks caused by timers/listeners/promises?

**Answer:**

Leaks happen when references are kept longer than needed.

Common causes:
- `setInterval` not cleared
- Event listeners not removed
- Pending async work updating unmounted components
- Large closures retaining objects

Prevention:
- Cleanup in teardown/unmount
- Use `AbortController` for requests
- Remove listeners and clear timers

---

### 30) How do you debug async JavaScript issues effectively (logs, stack traces, breakpoints)?

**Answer:**

Practical approach:
1. Add structured logs with request IDs and timestamps.
2. Check Promise chains for missing `return`/`await`.
3. Use breakpoints in async functions and inspect call stack.
4. Enable pause on exceptions/rejections in DevTools.
5. Reproduce with deterministic delays (mock timers/network).
6. Watch for event loop ordering (microtask vs macrotask).

## 4. DOM, browser, web platform, performance & security

### 1) What is the DOM and how does JavaScript interact with it?

**Answer:**

The **DOM (Document Object Model)** is a tree-like object representation of HTML/XML in the browser.

JavaScript interacts with it by:
- Selecting nodes
- Changing content/styles/attributes
- Creating/removing elements
- Handling events

```js
const title = document.querySelector("h1");
title.textContent = "Updated";
title.classList.add("active");
```

---

### 2) What is the difference between innerText, textContent, and innerHTML?

**Answer:**

- `innerText`
  - Returns rendered visible text
  - Respects CSS (may trigger layout)
- `textContent`
  - Returns raw text content (including hidden text)
  - Faster, no HTML parsing
- `innerHTML`
  - Gets/sets HTML markup
  - Can create XSS risk if used with untrusted data

```js
el.textContent = "<b>Hello</b>"; // literal text
el.innerHTML = "<b>Hello</b>";   // bold HTML
```

---

### 3) What is event bubbling and event capturing?

**Answer:**

DOM event flow has 3 phases:
1. Capturing: top -> target
2. Target phase
3. Bubbling: target -> top

By default, listeners run in bubbling phase unless `{ capture: true }` is set.

---

### 4) What is event delegation and why is it useful?

**Answer:**

Event delegation means attaching one listener on a parent and handling child events using `event.target`.

Why useful:
- Fewer listeners (better memory/performance)
- Works for dynamically added child elements

```js
list.addEventListener("click", (e) => {
  if (e.target.matches("button.delete")) {
    e.target.closest("li").remove();
  }
});
```

---

### 5) What is the difference between event.target and event.currentTarget?

**Answer:**

- `event.target` -> actual element where event originated
- `event.currentTarget` -> element whose listener is currently executing

In delegated handlers, these are often different.

---

### 6) How do addEventListener options (capture, once, passive) work?

**Answer:**

- `capture: true` -> run in capture phase
- `once: true` -> auto-remove listener after first call
- `passive: true` -> tells browser listener will not call `preventDefault()` (helps scroll performance)

```js
window.addEventListener("scroll", onScroll, { passive: true });
```

---

### 7) What is the difference between preventing default behavior and stopping propagation?

**Answer:**

- `event.preventDefault()`
  - Cancels default browser action (if cancelable), like form submit/navigation
- `event.stopPropagation()`
  - Stops event from moving to parent/child listeners

These solve different problems and are often used together when needed.

---

### 8) What is CORS and why does the browser enforce it?

**Answer:**

**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism controlling cross-origin requests.

Browser enforces it to protect users from unauthorized cross-site data access.  
Server must allow origin explicitly via headers like `Access-Control-Allow-Origin`.

---

### 9) What is the same-origin policy?

**Answer:**

Same-origin policy restricts scripts from reading data from a different origin.

Origin = **protocol + host + port**.

```txt
https://app.com:443 and https://api.app.com:443 -> different origin (host differs)
```

It is the baseline browser security model; CORS relaxes it in controlled ways.

---

### 10) What is JSON and what are common serialization pitfalls?

**Answer:**

JSON is a text format for structured data exchange.

Common pitfalls with `JSON.stringify` / `JSON.parse`:
- Drops `undefined`, functions, symbols
- Converts `Date` to string
- Cannot handle `BigInt` (throws)
- Fails on circular references

---

### 11) What is localStorage, sessionStorage, and when should you avoid storing sensitive data there?

**Answer:**

- `localStorage`
  - Persistent until cleared
- `sessionStorage`
  - Cleared when tab/session ends

Both are readable by JavaScript on the page, so avoid storing sensitive tokens/passwords there due to XSS risk.

---

### 12) What are cookies, and what do HttpOnly, Secure, and SameSite mean (high level)?

**Answer:**

Cookies are small key-value data sent with HTTP requests for a domain/path.

- `HttpOnly`: JavaScript cannot read it (`document.cookie` access blocked)
- `Secure`: sent only over HTTPS
- `SameSite`:
  - `Strict`/`Lax`/`None` controls cross-site sending behavior
  - Helps reduce CSRF risk

---

### 13) What is XSS (Cross-Site Scripting) and how can front-end code reduce risk?

**Answer:**

XSS happens when untrusted input is executed as script in a page.

Front-end mitigation:
- Prefer `textContent` over `innerHTML`
- Sanitize untrusted HTML (if rendering HTML is required)
- Escape user-generated content in templates
- Avoid inline scripts
- Use CSP (Content Security Policy)

---

### 14) What is CSRF and how is it mitigated in web apps?

**Answer:**

CSRF (Cross-Site Request Forgery) tricks a logged-in user browser into sending unwanted requests.

Common mitigations:
- CSRF tokens
- `SameSite` cookies
- Re-authentication for critical actions
- Verify `Origin`/`Referer` headers where appropriate

---

### 15) What is the difference between authentication and authorization?

**Answer:**

- **Authentication (AuthN)**: verifies who the user is (login)
- **Authorization (AuthZ)**: verifies what the user can do (permissions/roles)

Example: User logs in (AuthN) but may not have admin access (AuthZ).

---

### 16) What is JWT at a high level, and what are common mistakes when using it in JS apps?

**Answer:**

JWT (JSON Web Token) is a signed token carrying claims (user id, role, expiry, etc.).

Common mistakes:
- Storing access tokens in insecure places vulnerable to XSS
- Missing expiry/refresh strategy
- Not validating signature/issuer/audience properly
- Putting sensitive data directly in token payload
- Treating JWT as encrypted (it is usually only base64url encoded + signed)

---

### 17) What is lazy loading in frontend applications?

**Answer:**

Lazy loading delays loading non-critical resources until needed.

Examples:
- Route-based component loading
- Images below fold (`loading="lazy"`)
- On-demand modules with `import()`

It improves initial load time and perceived performance.

---

### 18) What is code splitting and dynamic import in JavaScript?

**Answer:**

Code splitting breaks a large bundle into smaller chunks.

`import()` loads modules on demand at runtime.

```js
button.addEventListener("click", async () => {
  const mod = await import("./charts.js");
  mod.renderChart();
});
```

---

### 19) How do you measure and improve frontend performance (network, rendering, JS execution)?

**Answer:**

Measure with:
- Lighthouse / Web Vitals (LCP, INP, CLS)
- Performance panel and Network tab

Improve by:
- Reducing bundle size and blocking JS
- Caching, compression, CDN
- Image optimization
- Avoiding expensive re-renders/layout work
- Splitting code and lazy loading

---

### 20) What causes reflow/repaint in browsers, and how can JS code reduce layout thrashing?

**Answer:**

- **Reflow (layout)**: geometry changes (size/position) require layout recalculation
- **Repaint**: visual changes (color/background) without layout changes

Layout thrashing happens when code repeatedly reads layout then writes style in loops.

Reduce by:
- Batch DOM reads and writes
- Update classes once instead of many style mutations
- Use `requestAnimationFrame` for visual updates

---

### 21) What is the difference between defer and async script loading?

**Answer:**

- `defer`
  - Downloads in parallel
  - Executes after HTML parsing
  - Preserves script order
- `async`
  - Downloads in parallel
  - Executes as soon as downloaded
  - Does not guarantee order

Use `defer` for app scripts with dependencies; `async` for independent scripts.

---

### 22) What is the Fetch API and how is it different from XHR (high level)?

**Answer:**

Fetch is modern Promise-based API for HTTP requests.

Compared to XHR:
- Cleaner Promise syntax
- Better streaming support
- No built-in progress events like XHR upload progress (needs other approaches)

```js
const res = await fetch("/api/data");
if (!res.ok) throw new Error("Request failed");
const data = await res.json();
```

---

### 23) How do you handle HTTP status codes and error payloads in frontend JavaScript?

**Answer:**

`fetch` only rejects on network failures, not on HTTP 4xx/5xx.  
You must check `response.ok` / `response.status`.

```js
async function request(url) {
  const res = await fetch(url);
  let body = null;
  try {
    body = await res.json();
  } catch {}
  if (!res.ok) {
    throw new Error(body?.message || `HTTP ${res.status}`);
  }
  return body;
}
```

---

### 24) What is accessibility (a11y) and what are common JavaScript-related accessibility mistakes?

**Answer:**

Accessibility means building UI usable by people with disabilities (keyboard, screen reader, low vision, etc.).

Common JS-related mistakes:
- Click handlers on non-interactive elements without keyboard support
- Missing focus management in modals/drawers
- Dynamic updates not announced to screen readers
- Removing outlines without replacement
- Using custom controls without proper ARIA roles/states

Use semantic HTML first, then ARIA only when needed.

## 5. Node.js, backend JavaScript, APIs & databases

### 1) What is Node.js and where is it a good fit?

**Answer:**

Node.js is a JavaScript runtime built on Chrome V8 that lets you run JS outside the browser.

Good fit for:
- I/O-heavy apps (APIs, real-time apps, chat, streaming)
- Microservices and BFF layers
- Tools/CLIs and automation

Less ideal for CPU-heavy tasks unless offloaded to workers/services.

---

### 2) What is the difference between JavaScript runtime in browser vs Node.js?

**Answer:**

- Browser runtime:
  - Has DOM, `window`, `document`
  - Focused on UI/event handling
- Node.js runtime:
  - Has `global`, `process`, filesystem/network modules
  - No DOM APIs by default

Both run JS, but available APIs and use-cases differ.

---

### 3) What is the Node.js event loop, and how is it related to libuv (high level)?

**Answer:**

Node event loop processes callbacks in phases (timers, I/O callbacks, check, close, etc.).

`libuv` is the C library that powers:
- Event loop implementation
- Non-blocking I/O
- Thread pool for operations like file system, DNS, crypto

---

### 4) What is single-threaded in Node.js, and what work can happen outside the main thread?

**Answer:**

JavaScript execution is single-threaded on the main event loop thread.

But Node can do work off the main thread:
- `libuv` thread pool (fs, crypto, DNS)
- OS/network async operations
- Worker Threads for CPU-bound JS

---

### 5) What is non-blocking I/O and why is it important in Node.js?

**Answer:**

Non-blocking I/O means starting an I/O operation and continuing other work while waiting for completion.

Why important:
- Keeps event loop responsive
- Handles many concurrent connections efficiently
- Better throughput for network/file-heavy servers

---

### 6) What is the difference between blocking and non-blocking code with examples (fs.readFileSync vs fs.readFile)?

**Answer:**

- Blocking API pauses event loop until finished.
- Non-blocking API schedules operation and callback/promise runs later.

```js
const fs = require("fs");

// Blocking
const text = fs.readFileSync("a.txt", "utf8");
console.log(text);

// Non-blocking
fs.readFile("a.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

---

### 7) What is the CommonJS module system in Node.js?

**Answer:**

CommonJS is Node's traditional module format.

- Import with `require()`
- Export with `module.exports` / `exports`
- Loaded synchronously at runtime

```js
// math.js
module.exports = { add: (a, b) => a + b };

// app.js
const { add } = require("./math");
```

---

### 8) What is the difference between CommonJS and ES Modules in Node.js projects?

**Answer:**

- CommonJS:
  - `require` / `module.exports`
  - Dynamic loading style
- ES Modules:
  - `import` / `export`
  - Static structure, better tree shaking

Node chooses mode by file extension (`.mjs`/`.cjs`) or `package.json` `"type"` field.

---

### 9) What is npm, and what is the difference between dependencies and devDependencies?

**Answer:**

npm is Node package manager and registry ecosystem.

- `dependencies`: needed at runtime (production)
- `devDependencies`: only for development/test/build tooling

```bash
npm install express
npm install -D jest eslint
```

---

### 10) What is package.json and what are the most important fields interviewers ask about?

**Answer:**

`package.json` is project metadata + dependency + script config.

Important fields:
- `name`, `version`
- `scripts`
- `dependencies`, `devDependencies`
- `main` / `exports`
- `type` (`commonjs` or `module`)
- `engines` (optional Node version constraints)

---

### 11) What is Express.js and why is it commonly used?

**Answer:**

Express is a minimal Node web framework for APIs and server apps.

Why popular:
- Simple routing and middleware model
- Huge ecosystem
- Fast setup and flexible architecture

```js
const express = require("express");
const app = express();
app.get("/health", (_, res) => res.json({ ok: true }));
```

---

### 12) What is middleware in Express? Explain request-response lifecycle.

**Answer:**

Middleware is a function that has access to `req`, `res`, and `next`.

Lifecycle:
1. Request enters app
2. Middleware chain runs in order
3. Route handler sends response
4. Error middleware handles thrown/forwarded errors

```js
app.use((req, res, next) => {
  req.start = Date.now();
  next();
});
```

---

### 13) What is the difference between application-level, router-level, and error-handling middleware?

**Answer:**

- Application-level: attached to `app.use(...)` for whole app
- Router-level: attached to `router.use(...)` for specific route groups
- Error-handling: signature `(err, req, res, next)` and runs for errors

```js
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error" });
});
```

---

### 14) How do you design a REST API in Node.js (resources, routes, methods)?

**Answer:**

Design around resources (nouns), then map HTTP methods:
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

Use consistent:
- Naming
- Validation
- Status codes
- Error response format

---

### 15) What is idempotency in HTTP methods? Explain POST vs PUT vs PATCH.

**Answer:**

Idempotent means repeating same request has same effect as once.

- `POST`: usually non-idempotent (creates new resource)
- `PUT`: idempotent full replacement
- `PATCH`: partial update; can be idempotent depending on operation

---

### 16) What are common HTTP status codes used in CRUD APIs and when do you return each?

**Answer:**

Common codes:
- `200 OK`: successful read/update
- `201 Created`: successful create
- `204 No Content`: successful delete/no body
- `400 Bad Request`: invalid input format
- `401 Unauthorized`: unauthenticated
- `403 Forbidden`: authenticated but not allowed
- `404 Not Found`: resource missing
- `409 Conflict`: duplicate/state conflict
- `422 Unprocessable Entity`: semantic validation errors
- `500 Internal Server Error`: server failure

---

### 17) How do you validate and sanitize request input in a Node.js API?

**Answer:**

Use schema validation at API boundary (e.g., Zod/Joi/express-validator).

Process:
1. Validate type/shape/rules
2. Sanitize/normalize input
3. Reject invalid payload with clear errors

Also always use parameterized queries to avoid injection.

---

### 18) What is CORS in backend APIs and how do you configure it in Express?

**Answer:**

CORS decides which origins/methods/headers can access your API from browsers.

```js
const cors = require("cors");
app.use(cors({
  origin: ["https://app.example.com"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));
```

Prefer explicit allowlists over `*` in production.

---

### 19) What is rate limiting in an API and how can you implement it in Node.js?

**Answer:**

Rate limiting restricts requests per client/time window to protect availability and reduce abuse.

Implementation options:
- In-memory (simple, single instance)
- Redis-backed (distributed)
- API gateway/WAF level

```js
// Example concept: 100 req / 15 min per IP
```

Return `429 Too Many Requests` with retry hints.

---

### 20) What is authentication in Node.js APIs (session vs JWT)?

**Answer:**

- Session auth:
  - Server stores session state
  - Client stores session id cookie
- JWT auth:
  - Token carries claims, usually stateless verification
  - Often paired with refresh token flow

Choice depends on scaling model, security requirements, and client architecture.

---

### 21) What is authorization (RBAC/ABAC) and how can you implement route protection?

**Answer:**

- RBAC: permissions by roles (admin/editor/user)
- ABAC: permissions by attributes (owner, department, resource state)

Typical approach:
1. Authenticate user
2. Attach identity/claims to `req.user`
3. Check policy in authorization middleware

```js
function allow(...roles) {
  return (req, res, next) => roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ message: "Forbidden" });
}
```

---

### 22) What is password hashing and why should you use bcrypt/argon2 instead of plain hashing?

**Answer:**

Password hashing stores a one-way transformed password, not plaintext.

Use `bcrypt`/`argon2` because they are slow, salted, password-specific algorithms designed to resist brute-force attacks.

Do not use fast hashes like SHA-256 alone for password storage.

---

### 23) How do you structure a Node.js project for scalability (routes/controllers/services/repositories)?

**Answer:**

Common layered structure:
- `routes` -> HTTP endpoints
- `controllers` -> request/response orchestration
- `services` -> business logic
- `repositories`/`data` -> DB access

Benefits:
- Separation of concerns
- Easier testing and maintenance
- Clear growth path for larger teams

---

### 24) What is environment configuration management and why should secrets never be hardcoded?

**Answer:**

Configuration should come from environment variables/config providers, not source code.

Why no hardcoded secrets:
- Security risk in git history/logs
- Hard to rotate keys
- Different values needed by environment (dev/stage/prod)

Use secret managers and `.env` only for local development.

---

### 25) What is logging in backend services, and what is a correlation/request ID?

**Answer:**

Logging captures operational events for debugging and monitoring.

A correlation/request ID is a unique id attached to all logs for a request, so you can trace one flow across services.

Best practice:
- Structured JSON logs
- Include level, timestamp, request id, route, duration, error fields

---

### 26) What is the difference between SQL and NoSQL from a backend API developer perspective?

**Answer:**

- SQL (PostgreSQL/MySQL):
  - Relational schema
  - Strong joins and transactions
  - Great for structured, relational data
- NoSQL (MongoDB, etc.):
  - Flexible schema
  - Easier document-style modeling for some use-cases
  - Often simpler horizontal scaling patterns

Choice should follow data shape and query patterns.

---

### 27) When would you choose PostgreSQL vs MongoDB for a Node.js service?

**Answer:**

Choose PostgreSQL when:
- Strong relational integrity is required
- Complex joins/reporting are needed
- ACID transactions are central

Choose MongoDB when:
- Document model fits domain naturally
- Schema evolves rapidly
- Nested object data is common and joins are limited

---

### 28) What are database transactions and when are they required?

**Answer:**

A transaction groups multiple operations into one atomic unit: all succeed or all roll back.

Required when:
- Multiple writes must stay consistent
- Financial/inventory/order flows
- Any case where partial success is unacceptable

```js
// Example flow: begin -> write A -> write B -> commit / rollback
```

---

### 29) What is connection pooling (e.g., in PostgreSQL clients) and why is it important?

**Answer:**

Connection pooling reuses a limited set of open DB connections instead of opening a new one per request.

Why important:
- Lower connection overhead
- Better latency and throughput
- Prevents exhausting DB connection limits

Tune pool size based on app concurrency and DB capacity.

---

### 30) What are common causes of memory leaks and performance bottlenecks in Node.js APIs?

**Answer:**

Common causes:
- Global/unbounded caches
- Unremoved event listeners/timers
- Large objects retained in closures
- Blocking CPU work on event loop
- N+1 DB queries and missing indexes
- Huge synchronous JSON parsing/stringifying

Mitigation:
- Profile with heap snapshots and CPU profiles
- Add timeouts, pagination, backpressure
- Use workers/queues for CPU-heavy tasks
- Monitor latency, memory, event loop lag

## 6. TypeScript-in-JS-ecosystem (often asked with JavaScript roles)

### 1) What is TypeScript and why do many JavaScript teams use it?

**Answer:**

TypeScript is a **typed superset of JavaScript** that compiles to plain JavaScript.

Why teams use it:
- Catches many bugs at compile time (before runtime)
- Improves autocomplete, navigation, and safe refactoring in IDEs
- Makes large codebases easier to maintain and onboard
- Supports gradual adoption in existing JavaScript projects

---

### 2) What is the difference between type and interface in TypeScript?

**Answer:**

Both describe shapes, but they have different strengths.

- `interface`
  - Best for object contracts and class implementations
  - Supports declaration merging
  - Extends via `extends`
- `type`
  - More flexible alias system
  - Can represent primitives, unions, intersections, tuples, mapped/conditional types
  - Cannot declaration-merge

```ts
interface User {
  id: string;
  name: string;
}

type UserId = string;
type Admin = User & { role: "admin" };
```

---

### 3) What are union types and intersection types?

**Answer:**

- **Union (`|`)**: value can be one of multiple types
- **Intersection (`&`)**: combines multiple types into one (must satisfy all)

```ts
type Id = string | number; // union

type Person = { name: string };
type Employee = { employeeId: number };
type Staff = Person & Employee; // intersection
```

---

### 4) What is type narrowing and how does TypeScript infer types?

**Answer:**

TypeScript **infers** types from values, assignments, and function return paths.  
It **narrows** broad types to specific ones using control-flow checks.

Common narrowing tools:
- `typeof`
- `instanceof`
- `"prop" in obj`
- Equality/truthiness checks
- Discriminated unions

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // id narrowed to string
  } else {
    console.log(id.toFixed(0)); // id narrowed to number
  }
}
```

---

### 5) What is any vs unknown vs never?

**Answer:**

- `any`
  - Turns off type safety for that value
  - Avoid unless absolutely necessary
- `unknown`
  - Safer top type: can hold anything, but must narrow before use
- `never`
  - Represents values that never occur (e.g., function that always throws, exhaustive checks)

```ts
let a: any = "x";
a.toFixed(); // no compile-time error (unsafe)

let u: unknown = "x";
// u.toUpperCase(); // error until narrowed

function fail(msg: string): never {
  throw new Error(msg);
}
```

---

### 6) What are generics and why are they useful in reusable functions?

**Answer:**

Generics let you write reusable code that keeps type information instead of using `any`.

```ts
function identity<T>(value: T): T {
  return value;
}

const n = identity(42);       // number
const s = identity("hello");  // string
```

Why useful:
- Reusability with strong typing
- Better inference and autocomplete
- Fewer type assertions/casts

---

### 7) What is Partial<T>, Pick<T, K>, Omit<T, K>, and Record<K, V>?

**Answer:**

These are built-in utility types:

- `Partial<T>`: makes all properties optional
- `Pick<T, K>`: picks selected keys
- `Omit<T, K>`: removes selected keys
- `Record<K, V>`: object type with keys `K` and value type `V`

```ts
type User = { id: string; name: string; age: number };

type UserPatch = Partial<User>;             // all optional
type UserPreview = Pick<User, "id" | "name">;
type UserWithoutAge = Omit<User, "age">;
type UserMap = Record<string, User>;
```

---

### 8) How do you type async functions and Promises in TypeScript?

**Answer:**

An `async` function should return `Promise<T>` where `T` is resolved value type.

```ts
async function fetchUser(id: string): Promise<{ id: string; name: string }> {
  return { id, name: "Sushil" };
}

async function logDone(): Promise<void> {
  console.log("done");
}
```

For plain promises:

```ts
const p: Promise<number> = Promise.resolve(123);
```

---

### 9) What are enums, and when should you avoid them in favor of union literals?

**Answer:**

`enum` defines named constant sets, but regular enums generate runtime JavaScript objects.

```ts
enum Status {
  Idle = "IDLE",
  Loading = "LOADING",
  Success = "SUCCESS"
}
```

For many app-level cases, prefer union literals:

```ts
type Status = "IDLE" | "LOADING" | "SUCCESS";
```

Why unions are often preferred:
- No extra runtime emit
- Simpler interop with JSON/API strings
- Works well with discriminated unions

Use enums when you specifically need enum semantics/runtime mapping.

---

### 10) What is the difference between compile-time type safety and runtime validation?

**Answer:**

- **Compile-time type safety (TypeScript)**:
  - Catches type errors during development/build
  - Removed at runtime (types are erased)
- **Runtime validation**:
  - Checks actual data while app is running
  - Required for external/untrusted input (API requests, forms, env vars)

```ts
type User = { id: string; age: number };

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "age" in value
  );
}
```

TypeScript alone cannot guarantee runtime payload correctness; validation is still needed.

## 7. Coding questions (JavaScript implementation & problem solving)

### 1) [Coding] Reverse a string without using built-in reverse().

**Answer:**

```js
function reverseString(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
```

---

### 2) [Coding] Check whether a string is a palindrome (ignore spaces/case as a follow-up).

**Answer:**

```js
function isPalindrome(str, ignoreSpacesAndCase = true) {
  const value = ignoreSpacesAndCase
    ? str.toLowerCase().replace(/\s+/g, "")
    : str;

  let left = 0;
  let right = value.length - 1;

  while (left < right) {
    if (value[left] !== value[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

---

### 3) [Coding] Find the maximum and minimum number in an array.

**Answer:**

```js
function findMinMax(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Array must not be empty");
  }

  let min = arr[0];
  let max = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }

  return { min, max };
}
```

---

### 4) [Coding] Remove duplicates from an array (multiple ways).

**Answer:**

```js
// 1) Using Set
const uniqueWithSet = (arr) => [...new Set(arr)];

// 2) Using filter + indexOf
const uniqueWithFilter = (arr) =>
  arr.filter((item, index) => arr.indexOf(item) === index);
```

---

### 5) [Coding] Count frequency of elements in an array/string.

**Answer:**

```js
function countFrequency(items) {
  const freq = new Map();
  for (const item of items) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }
  return freq;
}

// countFrequency("banana") => Map { 'b' => 1, 'a' => 3, 'n' => 2 }
```

---

### 6) [Coding] Find the first non-repeating character in a string.

**Answer:**

```js
function firstNonRepeatingChar(str) {
  const freq = {};
  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  for (const ch of str) {
    if (freq[ch] === 1) return ch;
  }
  return null;
}
```

---

### 7) [Coding] Check if two strings are anagrams.

**Answer:**

```js
function areAnagrams(a, b) {
  const normalize = (s) => s.toLowerCase().replace(/\s+/g, "");
  const s1 = normalize(a);
  const s2 = normalize(b);

  if (s1.length !== s2.length) return false;

  const count = {};
  for (const ch of s1) {
    count[ch] = (count[ch] || 0) + 1;
  }
  for (const ch of s2) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}
```

---

### 8) [Coding] Flatten a nested array to any depth.

**Answer:**

```js
function flattenDeep(arr) {
  const result = [];

  function walk(value) {
    for (const item of value) {
      if (Array.isArray(item)) {
        walk(item);
      } else {
        result.push(item);
      }
    }
  }

  walk(arr);
  return result;
}
```

---

### 9) [Coding] Implement deepClone(obj) without JSON.stringify.

**Answer:**

```js
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);

  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);

  if (value instanceof Map) {
    const clonedMap = new Map();
    seen.set(value, clonedMap);
    for (const [k, v] of value) {
      clonedMap.set(deepClone(k, seen), deepClone(v, seen));
    }
    return clonedMap;
  }

  if (value instanceof Set) {
    const clonedSet = new Set();
    seen.set(value, clonedSet);
    for (const item of value) {
      clonedSet.add(deepClone(item, seen));
    }
    return clonedSet;
  }

  const cloned = Array.isArray(value) ? [] : {};
  seen.set(value, cloned);

  for (const key of Reflect.ownKeys(value)) {
    cloned[key] = deepClone(value[key], seen);
  }

  return cloned;
}
```

---

### 10) [Coding] Implement deepEqual(a, b) for nested objects/arrays.

**Answer:**

```js
function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true;

  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }

  if (a.constructor !== b.constructor) return false;

  if (seen.has(a)) return seen.get(a) === b;
  seen.set(a, b);

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i], seen)) return false;
    }
    return true;
  }

  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp) return a.source === b.source && a.flags === b.flags;

  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, valueA] of a) {
      if (!b.has(key)) return false;
      if (!deepEqual(valueA, b.get(key), seen)) return false;
    }
    return true;
  }

  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const value of a) {
      if (!b.has(value)) return false;
    }
    return true;
  }

  const keysA = Reflect.ownKeys(a);
  const keysB = Reflect.ownKeys(b);
  if (keysA.length !== keysB.length) return false;

  const keysBSet = new Set(keysB);
  for (const key of keysA) {
    if (!keysBSet.has(key)) return false;
    if (!deepEqual(a[key], b[key], seen)) return false;
  }

  return true;
}
```

---

### 11) [Coding] Implement debounce(fn, wait).

**Answer:**

```js
function debounce(fn, wait) {
  let timerId;

  return function (...args) {
    const context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(context, args), wait);
  };
}
```

---

### 12) [Coding] Implement throttle(fn, wait).

**Answer:**

```js
function throttle(fn, wait) {
  let lastCall = 0;
  let timerId = null;
  let lastArgs;
  let lastContext;

  return function (...args) {
    const now = Date.now();
    const remaining = wait - (now - lastCall);
    lastArgs = args;
    lastContext = this;

    if (remaining <= 0) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      lastCall = now;
      fn.apply(lastContext, lastArgs);
    } else if (!timerId) {
      timerId = setTimeout(() => {
        lastCall = Date.now();
        timerId = null;
        fn.apply(lastContext, lastArgs);
      }, remaining);
    }
  };
}
```

---

### 13) [Coding] Implement once(fn).

**Answer:**

```js
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}
```

---

### 14) [Coding] Implement memoize(fn) for pure functions.

**Answer:**

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

---

### 15) [Coding] Implement a custom map function.

**Answer:**

```js
function myMap(arr, callback, thisArg) {
  if (!Array.isArray(arr)) throw new TypeError("Expected an array");

  const result = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      result[i] = callback.call(thisArg, arr[i], i, arr);
    }
  }
  return result;
}
```

---

### 16) [Coding] Implement a custom filter function.

**Answer:**

```js
function myFilter(arr, callback, thisArg) {
  if (!Array.isArray(arr)) throw new TypeError("Expected an array");

  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}
```

---

### 17) [Coding] Implement a custom reduce function.

**Answer:**

```js
function myReduce(arr, callback, initialValue) {
  if (!Array.isArray(arr)) throw new TypeError("Expected an array");

  let i = 0;
  let accumulator = initialValue;

  if (arguments.length < 3) {
    while (i < arr.length && !(i in arr)) i++;
    if (i >= arr.length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = arr[i++];
  }

  for (; i < arr.length; i++) {
    if (i in arr) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
}
```

---

### 18) [Coding] Implement Promise.all (basic polyfill version).

**Answer:**

```js
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const items = Array.from(iterable);
    const results = new Array(items.length);
    let remaining = items.length;

    if (remaining === 0) {
      resolve([]);
      return;
    }

    items.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value;
          remaining--;
          if (remaining === 0) resolve(results);
        },
        (error) => reject(error)
      );
    });
  });
}
```

---

### 19) [Coding] Implement Promise.race (basic polyfill version).

**Answer:**

```js
function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    for (const item of iterable) {
      Promise.resolve(item).then(resolve, reject);
    }
  });
}
```

---

### 20) [Coding] Implement retry(fn, retries) for async functions.

**Answer:**

```js
async function retry(fn, retries, delayMs = 0) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === retries) break;
      if (delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}
```

---

### 21) [Coding] Implement a timeout wrapper for a Promise.

**Answer:**

```js
function withTimeout(promise, ms, message = "Operation timed out") {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => reject(new Error(message)), ms);

    Promise.resolve(promise).then(
      (value) => {
        clearTimeout(timerId);
        resolve(value);
      },
      (error) => {
        clearTimeout(timerId);
        reject(error);
      }
    );
  });
}
```

---

### 22) [Coding] Implement a simple event emitter (on, emit, off).

**Answer:**

```js
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, handler) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    const handlers = this.events.get(event);
    if (!handlers) return;
    handlers.delete(handler);
    if (handlers.size === 0) this.events.delete(event);
  }

  emit(event, ...args) {
    const handlers = this.events.get(event);
    if (!handlers) return;
    for (const handler of [...handlers]) {
      handler(...args);
    }
  }
}
```

---

### 23) [Coding] Group an array of objects by a key (e.g., groupBy(users, 'city')).

**Answer:**

```js
function groupBy(items, keyOrFn) {
  return items.reduce((acc, item) => {
    const key =
      typeof keyOrFn === "function" ? keyOrFn(item) : item[keyOrFn];
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}
```

---

### 24) [Coding] Sort an array of objects by one or more keys.

**Answer:**

```js
function sortBy(items, criteria) {
  const rules = Array.isArray(criteria) ? criteria : [criteria];

  return [...items].sort((a, b) => {
    for (const rule of rules) {
      const key = typeof rule === "string" ? rule : rule.key;
      const order = typeof rule === "string" ? "asc" : rule.order || "asc";

      if (a[key] === b[key]) continue;

      const compare = a[key] > b[key] ? 1 : -1;
      return order === "desc" ? -compare : compare;
    }
    return 0;
  });
}
```

---

### 25) [Coding] Merge two sorted arrays into one sorted array.

**Answer:**

```js
function mergeSortedArrays(a, b) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) {
      result.push(a[i++]);
    } else {
      result.push(b[j++]);
    }
  }

  while (i < a.length) result.push(a[i++]);
  while (j < b.length) result.push(b[j++]);

  return result;
}
```

---

### 26) [Coding] Find the missing number in an array of 1..n.

**Answer:**

```js
function findMissingNumber(arr) {
  const n = arr.length + 1;
  const expected = (n * (n + 1)) / 2;
  const actual = arr.reduce((sum, num) => sum + num, 0);
  return expected - actual;
}
```

---

### 27) [Coding] Move all zeros in an array to the end while preserving order.

**Answer:**

```js
function moveZerosToEnd(arr) {
  const result = [];
  let zeroCount = 0;

  for (const num of arr) {
    if (num === 0) zeroCount++;
    else result.push(num);
  }

  while (zeroCount--) result.push(0);
  return result;
}
```

---

### 28) [Coding] Find the second largest number in an array.

**Answer:**

```js
function secondLargest(arr) {
  let first = -Infinity;
  let second = -Infinity;

  for (const num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num < first) {
      second = num;
    }
  }

  return second === -Infinity ? null : second;
}
```

---

### 29) [Coding] Find the intersection of two arrays.

**Answer:**

```js
function intersection(arr1, arr2) {
  const set2 = new Set(arr2);
  return [...new Set(arr1)].filter((item) => set2.has(item));
}
```

---

### 30) [Coding] Implement chunk(array, size).

**Answer:**

```js
function chunk(array, size) {
  if (size <= 0) throw new Error("size must be greater than 0");

  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
```

---

### 31) [Coding] Implement compose(...fns) / pipe(...fns).

**Answer:**

```js
const compose =
  (...fns) =>
  (value) =>
    fns.reduceRight((acc, fn) => fn(acc), value);

const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);
```

---

### 32) [Coding] Convert a callback-based function to return a Promise (promisify).

**Answer:**

```js
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}
```

---

### 33) [Coding] Implement pagination logic for an array (page, limit) and return metadata.

**Answer:**

```js
function paginate(items, page = 1, limit = 10) {
  if (limit <= 0) throw new Error("limit must be greater than 0");

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * limit;
  const data = items.slice(start, start + limit);

  return {
    data,
    meta: {
      page: currentPage,
      limit,
      totalItems,
      totalPages,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages
    }
  };
}
```

---

### 34) [Coding] Write a function to safely access nested object paths (get(obj, 'a.b.c')).

**Answer:**

```js
function get(obj, path, defaultValue = undefined) {
  if (!path) return obj;

  const keys = Array.isArray(path) ? path : path.split(".");
  let current = obj;

  for (const key of keys) {
    if (current == null || !(key in Object(current))) {
      return defaultValue;
    }
    current = current[key];
  }

  return current;
}
```

---

### 35) [Coding] LRU cache (basic version) using Map.

**Answer:**

```js
class LRUCache {
  constructor(capacity) {
    if (capacity <= 0) throw new Error("capacity must be greater than 0");
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }
}
```

---

### 36) [Coding] Two Sum (return indices or values) in JavaScript.

**Answer:**

```js
function twoSum(nums, target) {
  const seen = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];
    if (seen.has(needed)) {
      return [seen.get(needed), i];
    }
    seen.set(nums[i], i);
  }

  return [];
}
```

---

### 37) [Coding] Sliding window: find longest substring without repeating characters.

**Answer:**

```js
function lengthOfLongestSubstring(s) {
  const lastIndex = new Map();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];

    if (lastIndex.has(ch) && lastIndex.get(ch) >= left) {
      left = lastIndex.get(ch) + 1;
    }

    lastIndex.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

---

### 38) [Coding] Two pointers: check if a sorted array has a pair with target sum.

**Answer:**

```js
function hasPairWithSumSorted(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return true;
    if (sum < target) left++;
    else right--;
  }

  return false;
}
```
