# TypeScript Interview Q&A (Core to Advanced) - 212 Questions

## 1) TypeScript Fundamentals (1-35)

ASCII map:

```text
.ts source code
    |
    |  Compile-time: type check, inference, narrowing
    v
.js output (types erased)
    |
    v
Runtime (Node.js / Browser)
```

### 1) What does TypeScript add on top of JavaScript, and what problems does it solve?

**Answer:**

TypeScript adds a static type system, editor tooling, and safer refactors on top of JavaScript.

- Catches many errors before runtime
- Improves autocomplete and navigation
- Makes large codebases easier to maintain

```ts
function add(a: number, b: number): number {
  return a + b;
}

// add("1", 2); // Error: string is not assignable to number
```

---

### 2) Type inference: when does TS infer types correctly, and when should you annotate?

**Answer:**

Inference works well for local variables, return values, and literals. Add annotations at boundaries (APIs, public functions, complex generics).

```ts
const count = 10; // inferred as number

function square(x: number) {
  return x * x; // return inferred as number
}

// Good place to annotate: exported API
export function parseId(raw: string): number {
  return Number(raw);
}
```

---

### 3) What is the difference between `any`, `unknown`, and `never`?

**Answer:**

- `any`: turns off type safety
- `unknown`: safe top type, must narrow before use
- `never`: value that cannot exist (unreachable)

```ts
let a: any = "x";
a.toFixed(); // no error at compile time, risky

let u: unknown = "x";
// u.toUpperCase(); // Error until narrowed

function fail(msg: string): never {
  throw new Error(msg);
}
```

---

### 4) When should you use `unknown` instead of `any`?

**Answer:**

Use `unknown` for untrusted input (API, JSON, catch errors) because it forces validation before use.

```ts
function parseUser(input: unknown) {
  if (typeof input === "object" && input !== null && "id" in input) {
    return input;
  }
  throw new Error("Invalid user");
}
```

---

### 5) What does `never` represent? Give real examples where TS infers `never`.

**Answer:**

`never` means no possible value.

- Function that always throws
- Exhaustive switch default branch
- Impossible intersections (for conflicting literals)

```ts
function unreachable(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

type A = "x" & "y"; // never
```

---

### 6) What is the difference between `string | number` and `string & number`?

**Answer:**

- `string | number`: either type
- `string & number`: both at once, effectively impossible for primitives (`never`)

```ts
let v: string | number;
v = "id";
v = 42;

type Impossible = string & number; // never
```

---

### 7) Union types vs intersection types - use cases with examples.

**Answer:**

- Union: model alternatives (A or B)
- Intersection: combine capabilities (A and B)

```ts
type Cat = { meow: () => void };
type Dog = { bark: () => void };

type Pet = Cat | Dog; // either

type Service = { start: () => void };
type Disposable = { dispose: () => void };
type Managed = Service & Disposable; // both
```

---

### 8) Literal types: why use `'GET' | 'POST'` instead of `string`?

**Answer:**

Literal unions constrain valid values and catch typos.

```ts
type Method = "GET" | "POST";

function request(method: Method) {}

request("GET");
// request("DELETE"); // Error
```

---

### 9) `as const`: what does it do and why is it useful?

**Answer:**

`as const` freezes literal widening and makes properties readonly.

```ts
const cfg = {
  method: "GET",
  retry: 3
} as const;

// cfg.method is "GET" (not string)
// cfg.retry is 3 (not number)
```

---

### 10) Type widening vs type narrowing - explain with examples.

**Answer:**

Widening: literal becomes broader type. Narrowing: runtime checks reduce possible types.

```ts
let x = "hello"; // widened to string
const y = "hello"; // literal type "hello"

function print(v: string | number) {
  if (typeof v === "string") {
    console.log(v.toUpperCase()); // narrowed to string
  }
}
```

---

### 11) Narrowing techniques: `typeof`, `instanceof`, `in`, equality checks.

**Answer:**

TypeScript uses runtime checks to narrow unions.

```ts
function handle(v: Date | string | { id: string }) {
  if (typeof v === "string") return v.length;
  if (v instanceof Date) return v.getTime();
  if ("id" in v) return v.id.length;
  return 0;
}
```

---

### 12) User-defined type guards: what are they and when do you write them?

**Answer:**

A function returning `value is T` lets TS narrow custom structures.

```ts
type User = { id: string; name: string };

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}
```

---

### 13) What is a discriminated union and why is it powerful?

**Answer:**

A union with a shared literal tag enables safe exhaustive handling.

```text
kind: "loading" | "success" | "error"
           |
           +--> payload shape depends on kind
```

```ts
type State =
  | { kind: "loading" }
  | { kind: "success"; data: string[] }
  | { kind: "error"; message: string };

function render(s: State) {
  switch (s.kind) {
    case "loading":
      return "...";
    case "success":
      return s.data.join(",");
    case "error":
      return s.message;
  }
}
```

---

### 14) Optional properties vs `| undefined` - what is the difference?

**Answer:**

- `a?: T` means property may be absent
- `a: T | undefined` means property must exist, but value can be undefined

```ts
type A = { x?: number };
type B = { x: number | undefined };

const a1: A = {}; // valid
const b1: B = { x: undefined }; // must provide x
```

---

### 15) Optional chaining and nullish coalescing: `?.` and `??` pitfalls.

**Answer:**

`?.` stops on `null`/`undefined`; `??` falls back only for `null`/`undefined`.

```ts
const qty = 0;
console.log(qty || 10); // 10 (pitfall if 0 is valid)
console.log(qty ?? 10); // 0

const city = user?.address?.city ?? "Unknown";
```

---

### 16) Non-null assertion `!`: when is it safe vs risky?

**Answer:**

`!` tells TS "trust me, not null." Safe only when guaranteed by control flow or lifecycle.

```ts
const root = document.getElementById("app");
// root!.innerHTML = "ok"; // risky if element is missing

if (!root) throw new Error("Missing app root");
root.innerHTML = "ok"; // safe
```

---

### 17) `strictNullChecks`: what changes when it is enabled?

**Answer:**

`null` and `undefined` are no longer assignable to everything by default.

```ts
let name: string = "A";
// name = undefined; // Error with strictNullChecks

function len(s?: string) {
  return s?.length ?? 0;
}
```

---

### 18) `noImplicitAny`: what does it enforce?

**Answer:**

It rejects values/parameters inferred as `any` without explicit annotation.

```ts
// function sum(a, b) { return a + b; } // Error
function sum(a: number, b: number) {
  return a + b;
}
```

---

### 19) `strict` mode: what does it include and why do teams turn it on?

**Answer:**

`strict` enables a family of safety checks (null checks, implicit any, function variance checks, etc.). Teams enable it to reduce runtime defects and refactor safely.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

---

### 20) What is the difference between `interface` and `type` alias?

**Answer:**

Both describe shapes.

- `interface`: extendable and mergeable
- `type`: supports unions, intersections, mapped/conditional compositions

```ts
interface UserI {
  id: string;
}

type UserT = {
  id: string;
};
```

---

### 21) When do you prefer `interface` over `type`, and vice versa?

**Answer:**

- Prefer `interface` for public object contracts and class `implements`
- Prefer `type` for unions, primitives, utility-heavy compositions

```ts
interface Repo {
  find(id: string): Promise<unknown>;
}

type Status = "PENDING" | "DONE" | "FAILED";
```

---

### 22) Interface merging: what is it and where can it bite you?

**Answer:**

Same interface name declarations merge automatically.

- Useful for augmentation
- Risky when accidental duplicate names silently merge

```ts
interface Env {
  NODE_ENV: string;
}
interface Env {
  PORT: string;
}

const env: Env = { NODE_ENV: "prod", PORT: "3000" };
```

---

### 23) Extending: `interface extends` vs intersection with `type`.

**Answer:**

Both combine shapes; `extends` gives clearer inheritance, intersections are more compositional.

```ts
interface Base {
  id: string;
}
interface Admin extends Base {
  role: "admin";
}

type Admin2 = Base & { role: "admin" };
```

---

### 24) Index signatures: when would you use `[key: string]: ...`?

**Answer:**

Use for dictionary-like objects with unknown keys at design time.

```ts
type ScoreMap = {
  [name: string]: number;
};

const scores: ScoreMap = { alice: 90, bob: 85 };
```

---

### 25) Excess property checks: what are they and how to deal with them correctly?

**Answer:**

Object literals assigned to a target type are checked for extra keys.

```ts
type User = { id: string };

// const u: User = { id: "1", age: 20 }; // Error: age is excess

const raw = { id: "1", age: 20 };
const u: User = raw; // allowed because raw is a variable
```

Use `satisfies` when validating literals without losing inferred details.

---

### 26) Structural typing: "duck typing" in TS - explain with an example.

**Answer:**

Compatibility is based on shape, not explicit inheritance.

```ts
type Point = { x: number; y: number };

const p = { x: 1, y: 2, z: 3 };
const point: Point = p; // OK: has required fields
```

---

### 27) Readonly properties: `readonly` vs `Readonly<T>`.

**Answer:**

- `readonly` marks individual fields
- `Readonly<T>` converts all properties to readonly

```ts
type User = { id: string; name: string };

const u1: Readonly<User> = { id: "1", name: "A" };
// u1.name = "B"; // Error
```

---

### 28) What are tuple types and when should you use them?

**Answer:**

Tuples represent fixed-length arrays with known index types.

```ts
type HttpResult = [status: number, body: string];

const ok: HttpResult = [200, "OK"];
```

Use tuples for small ordered data, not large evolving objects.

---

### 29) Arrays: difference between `string[]` and `Array<string>`.

**Answer:**

No runtime or type difference. It is style preference.

- `string[]` often cleaner
- `Array<T>` can read better for nested generics

```ts
const a: string[] = ["a"];
const b: Array<string> = ["b"];
```

---

### 30) Enums: numeric vs string enums - pros/cons and modern alternatives.

**Answer:**

- Numeric enums have reverse mapping but can be less clear in logs
- String enums are readable but still emit runtime object
- Modern alternative: const object + union

```ts
const Status = {
  Idle: "IDLE",
  Done: "DONE"
} as const;

type Status = (typeof Status)[keyof typeof Status];
```

---

### 31) `const enum`: why it can be problematic in builds.

**Answer:**

`const enum` is inlined at compile time and removed from output. This can break with isolated transpilation or tooling that does not understand TS transforms.

```ts
const enum Mode {
  Dev,
  Prod
}

const m = Mode.Dev; // emitted as number literal
```

Prefer literal unions/const objects in shared libraries.

---

### 32) What is `satisfies` operator and how is it different from type assertion?

**Answer:**

`satisfies` checks compatibility while preserving narrow inferred types. Assertions (`as`) can force a type unsafely.

```ts
const routes = {
  home: "/",
  user: "/user/:id"
} satisfies Record<string, string>;

// routes.home remains literal "/"
```

---

### 33) Type assertions (`as X`) vs casting - what is actually happening?

**Answer:**

Type assertions are compile-time instructions only; no runtime conversion happens.

```ts
const raw = "123";
const num = raw as unknown as number; // no conversion, unsafe

const safeNum = Number(raw); // real runtime conversion
```

---

### 34) What is `tsconfig.json` and which options matter most in real projects?

**Answer:**

`tsconfig.json` controls type checking, module emit, and project behavior.

Key options often used:

- `strict`
- `target`
- `module`
- `moduleResolution`
- `rootDir` / `outDir`
- `esModuleInterop`
- `skipLibCheck`

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist"
  }
}
```

---

### 35) `target`, `module`, `moduleResolution`: how do they impact runtime behavior?

**Answer:**

```text
target            -> JS syntax level emitted
module            -> import/export output format
moduleResolution  -> how imports are resolved on disk
```

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}
```

Mismatch here can cause runtime import errors.

---

## 2) Functions, Overloads, Callbacks, Async Types (36-65)

ASCII map:

```text
Input types -> Function signature -> Inference/Generics -> Output type
      |                |                    |                |
      +----------------+--------------------+----------------+
                       compile-time contract
```

### 36) Function type annotations: how do you type parameters and return values?

**Answer:**

Annotate parameters and optionally return types.

```ts
function multiply(a: number, b: number): number {
  return a * b;
}

const fn: (x: string) => number = (x) => x.length;
```

---

### 37) Optional params vs default params - how they affect function types.

**Answer:**

Both allow omission by caller, but default param has concrete value inside function.

```ts
function greet(name?: string) {
  return `Hi ${name ?? "Guest"}`;
}

function greet2(name = "Guest") {
  return `Hi ${name}`; // name is string inside
}
```

---

### 38) Rest parameters typing: `(...args: number[]) => void`.

**Answer:**

Rest params are typed as arrays.

```ts
const logAll = (...args: number[]): void => {
  console.log(args.join(", "));
};
```

---

### 39) Overload signatures: what are they and why use them?

**Answer:**

Overloads define multiple call signatures for one implementation.

```ts
function toArray(value: string): string[];
function toArray(value: number): number[];
function toArray(value: string | number) {
  return [value];
}
```

Use when return type depends on input shape.

---

### 40) Overloads vs union parameters - when to choose which?

**Answer:**

- Use union params when return type is same for all inputs
- Use overloads when input determines a different return type

```ts
function len(x: string | any[]): number {
  return x.length;
}

function parse(x: string): number;
function parse(x: number): string;
function parse(x: string | number) {
  return typeof x === "string" ? Number(x) : String(x);
}
```

---

### 41) How do you type a function that can take either a single item or an array of items?

**Answer:**

Use union input and normalize.

```ts
function toList<T>(input: T | T[]): T[] {
  return Array.isArray(input) ? input : [input];
}
```

---

### 42) How do you type `this` inside a function (rare but important)?

**Answer:**

Use a fake first parameter named `this`.

```ts
function inc(this: { count: number }, step: number) {
  this.count += step;
}

const counter = { count: 0, inc };
counter.inc(2);
```

---

### 43) Generics in functions: basic syntax and common patterns.

**Answer:**

Generics keep types linked between input and output.

```ts
function identity<T>(value: T): T {
  return value;
}

const n = identity(42); // number
```

---

### 44) Generic constraints: `T extends { id: string }` - when needed.

**Answer:**

Use constraints when function logic relies on required properties.

```ts
function byId<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((x) => x.id === id);
}
```

---

### 45) Default generic type parameters: when are they useful?

**Answer:**

They provide ergonomic defaults while allowing override.

```ts
type ApiResponse<T = unknown> = {
  ok: boolean;
  data: T;
};
```

---

### 46) How do you type a callback pattern like `(err, result) => void`?

**Answer:**

Use `Error | null` for error-first callbacks.

```ts
type NodeCallback<T> = (err: Error | null, result?: T) => void;

function readValue(cb: NodeCallback<string>) {
  cb(null, "ok");
}
```

---

### 47) How do you type an async function and its return type correctly?

**Answer:**

Return `Promise<T>` explicitly for public APIs.

```ts
async function loadUser(id: string): Promise<{ id: string }> {
  return { id };
}
```

---

### 48) `Promise<T>` vs `async` return inference - when do you explicitly annotate?

**Answer:**

Inference is often fine internally. Annotate exported/public functions to lock contracts.

```ts
export async function getHealth(): Promise<{ ok: true }> {
  return { ok: true };
}
```

---

### 49) How do you type `fetch` responses safely (avoid `any`)?

**Answer:**

Treat JSON as `unknown`, then validate or parse with schema.

```ts
type User = { id: string; name: string };

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  const data: unknown = await res.json();

  if (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "name" in data
  ) {
    return data as User;
  }

  throw new Error("Invalid response");
}
```

---

### 50) How do you type a `try/catch` error variable in modern TS?

**Answer:**

With `useUnknownInCatchVariables`, `catch (e)` is `unknown` by default.

```ts
try {
  throw new Error("boom");
} catch (e: unknown) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
```

---

### 51) When do you use `asserts` functions (assertion signatures)?

**Answer:**

Use assertions when a function throws if condition fails, so TS narrows afterward.

```ts
function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new Error("Expected string");
}

const input: unknown = "abc";
assertString(input);
input.toUpperCase(); // now string
```

---

### 52) How do you type a higher-order function that returns a new function?

**Answer:**

Capture parameter and return types with generics.

```ts
function withLog<A extends unknown[], R>(fn: (...args: A) => R) {
  return (...args: A): R => {
    console.log("call", args);
    return fn(...args);
  };
}
```

---

### 53) How do you type a middleware function signature (Express-style) in TS?

**Answer:**

Use Express Request/Response/NextFunction types.

```ts
import { Request, Response, NextFunction } from "express";

function auth(req: Request, res: Response, next: NextFunction): void {
  if (!req.headers.authorization) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
```

---

### 54) How do you type a function that accepts a dynamic key and returns the corresponding value type?

**Answer:**

Use `K extends keyof T` and return `T[K]`.

```ts
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

---

### 55) How do you type a function that picks only allowed keys from an object?

**Answer:**

Use generic key arrays and `Pick<T, K>`.

```ts
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const key of keys) out[key] = obj[key];
  return out;
}
```

---

### 56) What is function variance and why can callback types be tricky?

**Answer:**

Variance controls assignability of parameter/return types. Callback parameters are contravariant in strict function types, so wider/narrower assumptions can break safety.

```ts
type Animal = { name: string };
type Dog = Animal & { bark: () => void };

type Handler<T> = (value: T) => void;

let hAnimal: Handler<Animal>;
let hDog: Handler<Dog>;

hDog = hAnimal; // allowed (strictFunctionTypes behavior)
```

---

### 57) What is the difference between `void` and `undefined` in return types?

**Answer:**

- `void`: caller should ignore return value
- `undefined`: function specifically returns `undefined`

```ts
function log(msg: string): void {
  console.log(msg);
}

function getU(): undefined {
  return undefined;
}
```

---

### 58) How do you model "either success or error" return types in TS?

**Answer:**

Use discriminated unions.

```ts
type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
```

---

### 59) How do you represent a Result type: `{ ok: true; value: T } | { ok: false; error: E }`?

**Answer:**

Define a reusable generic alias and narrow by `ok`.

```ts
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function unwrap<T, E>(r: Result<T, E>): T {
  if (!r.ok) throw new Error(String(r.error));
  return r.value;
}
```

---

### 60) How do you type event emitters in TS (typed events)?

**Answer:**

Create an event map and generic methods constrained by keys.

```ts
type Events = {
  connected: { id: string };
  closed: { code: number };
};

class Emitter<E extends Record<string, unknown>> {
  private listeners: { [K in keyof E]?: Array<(p: E[K]) => void> } = {};

  on<K extends keyof E>(event: K, fn: (payload: E[K]) => void): void {
    this.listeners[event] ??= [];
    this.listeners[event]!.push(fn);
  }

  emit<K extends keyof E>(event: K, payload: E[K]): void {
    this.listeners[event]?.forEach((fn) => fn(payload));
  }
}
```

---

### 61) How do you type a generic `debounce` function without losing argument types?

**Answer:**

Use `Parameters<F>` and `ThisParameterType<F>`.

```ts
function debounce<F extends (this: any, ...args: any[]) => void>(fn: F, wait: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}
```

---

### 62) How do you type `throttle` similarly?

**Answer:**

Reuse same input function type and preserve args/this.

```ts
function throttle<F extends (this: any, ...args: any[]) => void>(fn: F, wait: number) {
  let last = 0;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

---

### 63) How do you type a `memoize` helper (input/output types preserved)?

**Answer:**

Use generic function type and `ReturnType<F>`.

```ts
function memoize<F extends (...args: any[]) => any>(fn: F) {
  const cache = new Map<string, ReturnType<F>>();

  return (...args: Parameters<F>): ReturnType<F> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const value = fn(...args);
    cache.set(key, value);
    return value;
  };
}
```

---

### 64) How do you model async job status types safely (`PENDING | RUNNING | DONE | FAILED`)?

**Answer:**

Use a discriminated union with status-specific fields.

```ts
type JobState =
  | { status: "PENDING" }
  | { status: "RUNNING"; startedAt: number }
  | { status: "DONE"; result: string }
  | { status: "FAILED"; error: string };
```

---

### 65) [Coding] Write a typed `retry<T>(fn: () => Promise<T>, retries: number): Promise<T>`.

**Answer:**

```ts
export async function retry<T>(fn: () => Promise<T>, retries: number): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === retries) break;
    }
  }

  throw lastError;
}
```

---
## 3) Objects, Classes, OOP, and Access Modifiers (66-90)

ASCII map:

```text
class Foo {
  public    -> callable anywhere
  protected -> class + subclasses
  private   -> class only (TS check)
  #field    -> runtime private (JS enforced)
}
```

### 66) Explain public/private/protected in TS (compile-time vs runtime reality).

**Answer:**

These are compile-time access modifiers in TS (except `#private`). JS output still allows runtime access unless `#` is used.

```ts
class User {
  public name = "A";
  private token = "secret";
  protected role = "admin";
}
```

---

### 67) `readonly` in classes: what it enforces and what it does not.

**Answer:**

`readonly` prevents reassignment after initialization, but does not deep-freeze objects.

```ts
class Config {
  readonly env: string;
  constructor(env: string) {
    this.env = env;
  }
}
```

---

### 68) Parameter properties in constructors: `constructor(private db: Db) {}`.

**Answer:**

This shorthand declares and initializes class properties directly from constructor params.

```ts
class Service {
  constructor(private db: { query: (sql: string) => unknown }) {}

  run() {
    return this.db.query("select 1");
  }
}
```

---

### 69) Abstract classes vs interfaces - when to use which?

**Answer:**

- Interface: contract only
- Abstract class: shared behavior + contract

```ts
interface Logger {
  log(msg: string): void;
}

abstract class BaseRepo {
  abstract find(id: string): unknown;
  ping() {
    return "ok";
  }
}
```

---

### 70) `implements` vs `extends` differences.

**Answer:**

- `extends`: inherit implementation from class/base interface
- `implements`: class promises to match interface shape

```ts
interface CanRun {
  run(): void;
}

class Animal {
  move() {}
}

class Dog extends Animal implements CanRun {
  run() {}
}
```

---

### 71) Method overriding: how TS checks compatibility.

**Answer:**

Override must remain type-compatible with base method signature.

```ts
class Base {
  save(input: string): string {
    return input;
  }
}

class Child extends Base {
  override save(input: string): string {
    return input.toUpperCase();
  }
}
```

---

### 72) Getters/setters typing: common pitfalls.

**Answer:**

Getter and setter should agree on value type. Avoid hidden side effects and broad setter types.

```ts
class Counter {
  private _value = 0;

  get value(): number {
    return this._value;
  }

  set value(v: number) {
    if (v < 0) throw new Error("negative");
    this._value = v;
  }
}
```

---

### 73) Static properties/methods: how to type and when to use.

**Answer:**

Use static members for class-level utilities/state, not per-instance data.

```ts
class IdGen {
  private static nextId = 1;

  static create(): number {
    return this.nextId++;
  }
}
```

---

### 74) `this` typing in classes and fluent APIs.

**Answer:**

Return `this` from methods for chaining with subclass-aware types.

```ts
class Query {
  where(_x: string): this {
    return this;
  }

  limit(_n: number): this {
    return this;
  }
}
```

---

### 75) Class generics: `class Repo<T> { ... }` use cases.

**Answer:**

Use class generics for reusable typed containers/services.

```ts
class Repo<T extends { id: string }> {
  private items = new Map<string, T>();

  save(item: T) {
    this.items.set(item.id, item);
  }

  get(id: string): T | undefined {
    return this.items.get(id);
  }
}
```

---

### 76) How do you type dependency injection patterns in TS?

**Answer:**

Depend on interfaces (contracts), inject concrete implementations.

```ts
interface Mailer {
  send(to: string, body: string): Promise<void>;
}

class UserService {
  constructor(private mailer: Mailer) {}
}
```

---

### 77) What is "nominal typing" and how can you simulate it in TS?

**Answer:**

TS is structural by default. Simulate nominal behavior using brands/opaque types.

```ts
type UserId = string & { readonly __brand: "UserId" };

function toUserId(value: string): UserId {
  return value as UserId;
}
```

---

### 78) How do branded types help (e.g., `type UserId = string & { __brand: 'UserId' }`)?

**Answer:**

They prevent mixing logically different primitives.

```ts
type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };

function getUser(id: UserId) {}

const uid = "u1" as UserId;
// getUser("u1"); // Error without branding
getUser(uid);
```

---

### 79) When should you avoid classes in TS and use plain objects instead?

**Answer:**

Prefer plain objects/functions when you do not need inheritance, lifecycle state, or `new` semantics.

```ts
type TaxCalculator = (amount: number) => number;

const calcTax: TaxCalculator = (amount) => amount * 0.18;
```

---

### 80) How does TS handle private fields `#field` vs `private field`?

**Answer:**

- `private field`: TS-only access check
- `#field`: real runtime private field in JavaScript

```ts
class A {
  private x = 1;
  #y = 2;

  read() {
    return this.x + this.#y;
  }
}
```

---

### 81) What is the difference between `private` and ECMAScript `#private`?

**Answer:**

`private` is erased in JS; `#private` is enforced by JS engine at runtime.

```ts
class Box {
  private a = 1;
  #b = 2;
}

const b = new Box();
// b.a // compile error only
// b.#b // syntax/runtime enforced private
```

---

### 82) How do you type a DTO vs domain entity in a backend?

**Answer:**

Keep DTOs close to transport format and entities close to business rules.

```ts
type UserDto = {
  id: string;
  created_at: string; // API shape
};

class UserEntity {
  constructor(public id: string, public createdAt: Date) {}
}
```

---

### 83) How do you enforce immutability in TS (patterns)?

**Answer:**

Use `readonly`, `Readonly<T>`, `readonly T[]`, and immutable update patterns.

```ts
type State = Readonly<{
  count: number;
  tags: readonly string[];
}>;

const next = (s: State): State => ({ ...s, count: s.count + 1 });
```

---

### 84) How do you model configuration objects safely (required vs optional keys)?

**Answer:**

Split required and optional fields; validate external values before creating typed config.

```ts
type Config = {
  dbUrl: string;
  port?: number;
};
```

---

### 85) How do you type a dictionary/map-like object safely?

**Answer:**

Use `Record<K, V>` for known key unions; index signatures for open keys; `Map` for runtime map semantics.

```ts
type ById = Record<string, { id: string }>;
const users: ById = {};
```

---

### 86) How do you type JSON payloads coming from external services?

**Answer:**

Treat payload as `unknown`, validate shape, then convert to domain type.

```ts
type Product = { id: string; price: number };

function isProduct(v: unknown): v is Product {
  return (
    typeof v === "object" &&
    v !== null &&
    "id" in v &&
    "price" in v
  );
}
```

---

### 87) How do you avoid `as any` in real codebases?

**Answer:**

- Add narrow types at boundaries
- Use helper type guards/assertion functions
- Use generics and utility types
- Prefer `unknown` over `any`

```ts
function assertDefined<T>(value: T | null | undefined): asserts value is T {
  if (value == null) throw new Error("Expected value");
}
```

---

### 88) How do you structure types in a monorepo (shared types package)?

**Answer:**

Create a shared package (for example `@org/types`) with stable contracts used by API and consumers.

```text
packages/
  types/
    src/index.ts
  api/
  web/
```

Use versioning and change logs for breaking type changes.

---

### 89) How do you prevent circular type dependencies?

**Answer:**

- Keep shared primitives in leaf modules
- Split runtime code from type-only imports
- Use `import type` for types

```ts
import type { UserId } from "./ids";
```

---

### 90) [Coding] Create a typed `Config` class that validates required env vars and exposes typed getters.

**Answer:**

```ts
type RequiredEnv = "DB_URL" | "JWT_SECRET";

type OptionalEnv = {
  PORT?: string;
  NODE_ENV?: "development" | "test" | "production";
};

class Config {
  private readonly env: NodeJS.ProcessEnv;

  constructor(env: NodeJS.ProcessEnv) {
    this.env = env;
    this.require("DB_URL");
    this.require("JWT_SECRET");
  }

  private require(key: RequiredEnv): string {
    const value = this.env[key];
    if (!value) throw new Error(`Missing required env var: ${key}`);
    return value;
  }

  get dbUrl(): string {
    return this.require("DB_URL");
  }

  get jwtSecret(): string {
    return this.require("JWT_SECRET");
  }

  get port(): number {
    const raw = this.env.PORT ?? "3000";
    const parsed = Number(raw);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new Error(`Invalid PORT: ${raw}`);
    }
    return parsed;
  }

  get nodeEnv(): NonNullable<OptionalEnv["NODE_ENV"]> {
    return (this.env.NODE_ENV as OptionalEnv["NODE_ENV"]) ?? "development";
  }
}
```

---

## 4) Advanced Types (Mapped, Conditional, Utility Types) (91-125)

ASCII map:

```text
keyof T --> mapped types --> transformed object shapes
    |
    +--> conditional types (T extends U ? X : Y)
              |
              +--> infer pieces from other types
```

### 91) Utility types: `Partial`, `Required`, `Pick`, `Omit`, `Record` - use cases.

**Answer:**

These are standard type transformers used heavily in DTOs and service APIs.

```ts
type User = { id: string; name: string; age?: number };

type UserPatch = Partial<User>;
type UserStrict = Required<User>;
type UserView = Pick<User, "id" | "name">;
type UserNoAge = Omit<User, "age">;
type UserMap = Record<string, User>;
```

---

### 92) Difference between `Pick` and `Omit` in DTO transformations.

**Answer:**

- `Pick`: whitelist properties to include
- `Omit`: blacklist properties to remove

```ts
type User = { id: string; email: string; passwordHash: string };

type PublicUser = Pick<User, "id" | "email">;
type PublicUser2 = Omit<User, "passwordHash">;
```

---

### 93) `Record<K, V>`: when it is cleaner than index signatures.

**Answer:**

`Record` is cleaner when keys are a known union.

```ts
type Role = "admin" | "editor" | "viewer";
type Permissions = Record<Role, string[]>;
```

---

### 94) Mapped types: how `{ [K in keyof T]: ... }` works.

**Answer:**

Iterates over keys of `T` and builds a new type per key.

```ts
type ToNullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

---

### 95) Conditional types: `T extends U ? X : Y` - core idea.

**Answer:**

Type-level branching based on assignability.

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<"x">; // true
type B = IsString<number>; // false
```

---

### 96) `infer` keyword: explain with a simple example.

**Answer:**

`infer` captures part of a matched type in conditional types.

```ts
type ElementType<T> = T extends Array<infer U> ? U : never;

type E = ElementType<string[]>; // string
```

---

### 97) `ReturnType<T>` and `Parameters<T>` - practical uses.

**Answer:**

They derive types from function signatures and avoid duplication.

```ts
function createUser(name: string, age: number) {
  return { id: "u1", name, age };
}

type CreateUserArgs = Parameters<typeof createUser>;
type CreateUserResult = ReturnType<typeof createUser>;
```

---

### 98) `Awaited<T>`: why it matters in async code.

**Answer:**

It unwraps nested Promise-like values.

```ts
type A = Awaited<Promise<string>>; // string
type B = Awaited<Promise<Promise<number>>>; // number
```

---

### 99) Template literal types: use cases like building string unions.

**Answer:**

Combine unions into type-safe string patterns.

```ts
type Event = "created" | "deleted";
type Entity = "user" | "order";

type Topic = `${Entity}.${Event}`;
```

---

### 100) Key remapping in mapped types: `as` inside mapped types.

**Answer:**

Remap or filter keys while mapping.

```ts
type PrefixKeys<T> = {
  [K in keyof T as `api_${Extract<K, string>}`]: T[K];
};
```

---

### 101) `keyof` and indexed access: `T[K]` - explain with an example.

**Answer:**

`keyof` gives keys union; `T[K]` fetches corresponding value type.

```ts
type User = { id: string; age: number };
type Keys = keyof User; // "id" | "age"
type AgeType = User["age"]; // number
```

---

### 102) Distributive conditional types: what are they and when do they surprise you?

**Answer:**

Conditional types distribute over union members when the checked type is naked.

```ts
type ToArray<T> = T extends unknown ? T[] : never;

type R = ToArray<string | number>; // string[] | number[]
```

Surprise: you may expect `(string | number)[]` but get distribution.

---

### 103) `Exclude` vs `Extract` - difference and examples.

**Answer:**

- `Exclude<A, B>` removes members assignable to `B`
- `Extract<A, B>` keeps only members assignable to `B`

```ts
type A = "a" | "b" | "c";
type B = "b" | "x";

type OnlyA = Exclude<A, B>; // "a" | "c"
type Common = Extract<A, B>; // "b"
```

---

### 104) `NonNullable<T>` - when to use it.

**Answer:**

Use it after validation when null/undefined is no longer possible.

```ts
type MaybeName = string | null | undefined;
type Name = NonNullable<MaybeName>; // string
```

---

### 105) How do you model "exact objects only" (avoid extra keys) in TS?

**Answer:**

Use `satisfies`, helper exact types, or runtime validation for strict payloads.

```ts
type User = { id: string; name: string };

const u = {
  id: "1",
  name: "A"
} satisfies User;
```

For dynamic runtime inputs, enforce exactness with schema validators.

---

### 106) How do you type a function that accepts only keys of a given object?

**Answer:**

Constrain key with `K extends keyof T`.

```ts
function hasKey<T, K extends keyof T>(obj: T, key: K): boolean {
  return key in obj;
}
```

---

### 107) How do you type deep partial updates (`DeepPartial<T>`) and the risks?

**Answer:**

Recursive mapped type can model nested patches.

```ts
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
```

Risk: very broad object recursion can over-accept invalid shapes and make intent unclear.

---

### 108) How do you type "at least one property required" (`AtLeastOne<T>`)?

**Answer:**

Create a union where each key is required once.

```ts
type AtLeastOne<T> = {
  [K in keyof T]-?: Pick<T, K> & Partial<Omit<T, K>>;
}[keyof T];

type Filter = AtLeastOne<{ id: string; email: string }>;
```

---

### 109) How do you type "exactly one of these keys" (`XOR`)?

**Answer:**

Use mutually exclusive mapped helper types.

```ts
type XOR<T, U> =
  | (T & { [K in keyof U]?: never })
  | (U & { [K in keyof T]?: never });

type ById = { id: string };
type ByEmail = { email: string };
type UserLookup = XOR<ById, ByEmail>;
```

---

### 110) How do you model API responses that can be one of multiple shapes?

**Answer:**

Use discriminated unions with a status/tag field.

```ts
type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; code: number };
```

---

### 111) How do you model pagination response types generically?

**Answer:**

Define a reusable generic wrapper.

```ts
type Page<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
```

---

### 112) How do you type a generic repository interface for multiple entities?

**Answer:**

Use entity generic and ID generic.

```ts
interface Repository<T extends { id: ID }, ID = string> {
  findById(id: ID): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
}
```

---

### 113) How do you type a safe `groupBy<T, K extends keyof T>()`?

**Answer:**

Constrain key to object keys and return map by property values.

```ts
function groupBy<T, K extends keyof T>(items: T[], key: K): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const bucket = String(item[key]);
    (acc[bucket] ??= []).push(item);
    return acc;
  }, {});
}
```

---

### 114) How do you type a `pluck<T, K extends keyof T>(items: T[], key: K): T[K][]`?

**Answer:**

Use indexed access type in return.

```ts
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}
```

---

### 115) How do you type a typed event map and an emitter that enforces event payloads?

**Answer:**

Same pattern as typed emitter: key-constrained `on/emit` methods.

```ts
type EventMap = {
  login: { userId: string };
  logout: { userId: string; at: number };
};

class TypedEmitter<E extends Record<string, any>> {
  private listeners: { [K in keyof E]?: Array<(p: E[K]) => void> } = {};

  on<K extends keyof E>(event: K, handler: (payload: E[K]) => void) {
    this.listeners[event] ??= [];
    this.listeners[event]!.push(handler);
  }

  emit<K extends keyof E>(event: K, payload: E[K]) {
    this.listeners[event]?.forEach((h) => h(payload));
  }
}
```

---

### 116) How do you type a function that merges objects but preserves types correctly?

**Answer:**

Use intersection return type and generics.

```ts
function merge<A extends object, B extends object>(a: A, b: B): A & B {
  return { ...a, ...b };
}

const x = merge({ id: "1" }, { active: true });
// x has type { id: string } & { active: boolean }
```

---

### 117) How do you type `Object.keys()` results safely?

**Answer:**

Use a helper to cast to `Array<keyof T>`.

```ts
function typedKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}
```

---

### 118) Explain why `Object.entries()` loses types and how to fix it.

**Answer:**

`Object.entries` returns `[string, any][]`-like broad tuples because runtime keys are dynamic. Wrap it with typed helper.

```ts
function typedEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}
```

---

### 119) When do you use `as const` + `satisfies` together?

**Answer:**

Use both when you want:

- literal preservation (`as const`)
- compatibility checking (`satisfies`)

```ts
const routes = {
  home: "/",
  user: "/users/:id"
} as const satisfies Record<string, string>;
```

---

### 120) Explain `readonly` arrays (`readonly T[]`) and immutability.

**Answer:**

`readonly T[]` prevents mutating methods (`push`, `splice`) at compile time.

```ts
const nums: readonly number[] = [1, 2, 3];
// nums.push(4); // Error

const next = [...nums, 4]; // create new array
```

---

### 121) How do you model "API input" vs "API output" types differently?

**Answer:**

Input types usually omit server-generated fields; output includes computed/readonly fields.

```ts
type CreateUserInput = { name: string; email: string };
type UserOutput = CreateUserInput & { id: string; createdAt: string };
```

---

### 122) How do you type a schema validation result (success + errors)?

**Answer:**

Use result union with value or errors.

```ts
type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] };
```

---

### 123) How do you create a type-safe enum alternative using const objects?

**Answer:**

Use const object for values and derive union via indexed access.

```ts
const Role = {
  Admin: "ADMIN",
  User: "USER"
} as const;

type Role = (typeof Role)[keyof typeof Role];
```

---

### 124) When does TS get too complex - how do you simplify types?

**Answer:**

Simplify when type-level logic harms readability.

- Favor explicit interfaces over deeply nested conditional types
- Split complex helpers
- Type API boundaries well, keep internals pragmatic

```ts
// Prefer this:
type UserView = { id: string; name: string };
// over very clever but unreadable meta-types in core business code
```

---

### 125) [Coding] Implement `typedKeys<T>(obj: T): Array<keyof T>` safely.

**Answer:**

```ts
export function typedKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}
```

---
## 5) TypeScript + Node.js Project Setup, Tooling, Testing (126-150)

ASCII map:

```text
src/*.ts
  |
  +--> tsc (type-check + emit) ----> dist/*.js
  |
  +--> eslint/prettier (quality gates)
  |
  +--> jest/supertest (tests)
```

### 126) How do you set up TS for Node (tsconfig essentials)?

**Answer:**

Start with strict config and Node-compatible module settings.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"]
}
```

---

### 127) Common `tsconfig` options for backend: `strict`, `esModuleInterop`, `outDir`, `rootDir`.

**Answer:**

- `strict`: strongest type checks
- `esModuleInterop`: easier interop with CommonJS libs
- `rootDir`: input source root
- `outDir`: emitted build folder

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "rootDir": "src",
    "outDir": "dist"
  }
}
```

---

### 128) What is `esModuleInterop` and why does it matter with CommonJS libs?

**Answer:**

It allows default-import style for CommonJS exports and aligns TS emit/helpers with common Node ecosystem usage.

```ts
import express from "express"; // works cleanly with esModuleInterop true
```

---

### 129) `ts-node` vs compiling with `tsc` - when to use which?

**Answer:**

- `ts-node`: fast dev scripts
- `tsc` + `node dist`: predictable production build/runtime

```text
Development: ts-node src/index.ts
Production:  tsc && node dist/index.js
```

---

### 130) How do you configure path aliases (`baseUrl`, `paths`) and make them work at runtime?

**Answer:**

Configure aliases in TS, and ensure runtime/bundler also resolves them.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@core/*": ["src/core/*"]
    }
  }
}
```

Use runtime resolver (tsconfig-paths, bundler plugin, or Node loader config).

---

### 131) How do you structure a TS backend (src/, layers, types folder)?

**Answer:**

Use clear separation of concerns.

```text
src/
  api/
  services/
  repositories/
  domain/
  types/
  index.ts
```

---

### 132) How do you type Express request/response properly without using `any`?

**Answer:**

Use `Request<Params, ResBody, ReqBody, Query>` and typed `Response<ResBody>`.

```ts
import { Request, Response } from "express";

type Params = { id: string };
type ResBody = { id: string; name: string };

function getUser(req: Request<Params>, res: Response<ResBody>) {
  res.json({ id: req.params.id, name: "Sushil" });
}
```

---

### 133) How do you type custom fields on `req` (like `req.user`) safely?

**Answer:**

Use module augmentation for Express Request.

```ts
// express.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: "admin" | "user" };
    }
  }
}
```

---

### 134) How do you type middleware and error handlers in Express TS?

**Answer:**

Use `RequestHandler` and `ErrorRequestHandler`.

```ts
import { RequestHandler, ErrorRequestHandler } from "express";

const authMw: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};

const errorMw: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({ error: err.message });
};
```

---

### 135) How do you avoid type duplication between validation and types?

**Answer:**

Derive TS types from runtime schemas (for example Zod `infer`) instead of writing both separately.

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  age: z.number().int().nonnegative()
});

type User = z.infer<typeof UserSchema>;
```

---

### 136) Zod/Yup/Joi style: why runtime validation is required even with TS?

**Answer:**

TS checks compile-time source code only. Runtime inputs (HTTP, DB, env, queues) can still be invalid.

```text
External input -> runtime validator -> trusted typed object -> business logic
```

---

### 137) How do you generate types from OpenAPI, and what are benefits?

**Answer:**

Use OpenAPI codegen tools to create typed clients/models from spec.

Benefits:

- Contract consistency across services
- Fewer hand-written DTO mistakes
- Faster API integration

```text
openapi.yaml -> codegen -> typed client + models
```

---

### 138) How do you handle DTO validation (compile-time + runtime) in TS?

**Answer:**

Use both layers:

- Compile-time: DTO types/interfaces
- Runtime: schema validation before controller logic

```ts
const parsed = UserSchema.safeParse(req.body);
if (!parsed.success) {
  return res.status(400).json({ errors: parsed.error.issues });
}
```

---

### 139) How do you set up Jest with TypeScript (ts-jest or babel-jest)?

**Answer:**

Common setup: `jest` + `ts-jest` preset.

```js
// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node"
};
```

---

### 140) How do you mock typed modules in Jest without losing types?

**Answer:**

Use `jest.mock()` plus typed helpers/casts for mocked functions.

```ts
import * as repo from "../repo";
jest.mock("../repo");

const mockedRepo = jest.mocked(repo);
mockedRepo.findById.mockResolvedValue({ id: "1" });
```

---

### 141) How do you type mock functions in Jest (`jest.Mocked`, `jest.fn` generics)?

**Answer:**

Annotate mock function signatures explicitly.

```ts
const fn = jest.fn<Promise<number>, [string]>();
fn.mockResolvedValue(42);

type Api = { fetch: (id: string) => Promise<number> };
const mockedApi: jest.Mocked<Api> = {
  fetch: jest.fn()
};
```

---

### 142) How do you test async code with proper typing in Jest?

**Answer:**

Return/await promises and keep subject/mocks typed.

```ts
test("loads user", async () => {
  const value: Promise<number> = Promise.resolve(1);
  await expect(value).resolves.toBe(1);
});
```

---

### 143) How do you test Express endpoints with supertest in TS projects?

**Answer:**

Create app instance and hit typed routes via supertest.

```ts
import request from "supertest";
import { app } from "../app";

test("GET /health", async () => {
  const res = await request(app).get("/health");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ ok: true });
});
```

---

### 144) How do you keep types in sync in monorepos (shared packages)?

**Answer:**

Publish shared contracts package and consume pinned versions/workspace refs.

```text
packages/contracts -> exported types
packages/api, packages/web -> depend on contracts
CI ensures no breaking drift
```

---

### 145) How do you enforce linting/formatting (ESLint + Prettier) with TS?

**Answer:**

Run lint + format in CI and pre-commit hooks.

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts",
    "format": "prettier --write .",
    "check": "npm run lint && npm run test"
  }
}
```

---

### 146) What is `noUncheckedIndexedAccess` and why it can prevent runtime bugs?

**Answer:**

It makes indexed access include `undefined`, forcing checks.

```ts
const map: Record<string, number> = { a: 1 };
const value = map["b"]; // number | undefined when enabled
```

This catches missing-key assumptions early.

---

### 147) What is `exactOptionalPropertyTypes` and when is it useful?

**Answer:**

It treats optional properties more precisely: `x?: T` is not the same as `x: T | undefined`.

Useful in APIs where "missing" and "explicit undefined" mean different things.

```ts
type Patch = { name?: string };
```

---

### 148) What is `useUnknownInCatchVariables` and why it is safer?

**Answer:**

It makes catch variable `unknown`, forcing explicit narrowing before property access.

```ts
try {
  // ...
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
```

---

### 149) How do you handle breaking type changes during refactors safely?

**Answer:**

- Introduce transitional types/adapters
- Deprecate old contracts before removal
- Use codemods and strict CI type checks
- Version shared packages semantically

```text
v1 type -> adapter layer -> v2 type
```

---

### 150) [Coding] Create a small typed Express route handler that validates input and returns a typed response.

**Answer:**

```ts
import express, { Request, Response } from "express";
import { z } from "zod";
import { randomUUID } from "crypto";

const app = express();
app.use(express.json());

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
});

type CreateUserBody = z.infer<typeof CreateUserSchema>;
type CreateUserResponse =
  | { ok: true; user: { id: string; name: string; email: string } }
  | { ok: false; errors: string[] };

app.post(
  "/users",
  (req: Request<{}, CreateUserResponse, CreateUserBody>, res: Response<CreateUserResponse>) => {
    const parsed = CreateUserSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        ok: false,
        errors: parsed.error.issues.map((i) => i.message)
      });
      return;
    }

    const user = {
      id: randomUUID(),
      name: parsed.data.name,
      email: parsed.data.email
    };

    res.status(201).json({ ok: true, user });
  }
);
```

---

ASCII wrap-up:

```text
TypeScript safety stack

1) Type system (compile-time)
2) Runtime validation (zod/joi/yup)
3) Tests (unit/integration)
4) Lint + CI gates

All four together => reliable production systems
```

---

## 6) Declarations, Compiler Options, and Build Graph (151-170)

ASCII map:

```text
.ts -> type-check -> JS emit + .d.ts + sourcemaps
```

### 151) Explain what `.d.ts` declaration files are and when you would generate them from a library.

**Answer:**

`.d.ts` files contain type signatures only, not runtime code. Generate them when publishing a TS/JS library so consumers get autocomplete, type safety, and API contracts.

```json
{
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true
  }
}
```

---

### 152) What does `declare` do in TypeScript (e.g., `declare const`, `declare function`, `declare module`)?

**Answer:**

`declare` tells TypeScript "this exists at runtime elsewhere." It adds types without emitting JS.

```ts
declare const BUILD_ID: string;
declare function track(event: string): void;
declare module "legacy-sdk" {
  export function init(key: string): void;
}
```

---

### 153) What is the difference between `typeRoots` and `types` in tsconfig.json?

**Answer:**

- `typeRoots`: folders TS scans for declaration packages.
- `types`: exact package names from `@types/*` to include.

Use `types` to whitelist globals and keep ambient types predictable.

---

### 154) How does TypeScript decide which `lib` definitions to include, and what happens if `lib` is misconfigured?

**Answer:**

TS chooses default libs from `target` unless `lib` is explicitly set. If misconfigured, you get missing/extra globals (for example missing `Promise` or missing `DOM` types).

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"]
  }
}
```

---

### 155) What is `skipLibCheck` actually skipping, and what kinds of bugs can it hide?

**Answer:**

It skips type checking inside `.d.ts` files. This speeds builds, but can hide incompatible third-party type packages and conflicting duplicate declarations.

Use it for build speed only when dependency type quality is trusted.

---

### 156) What does `noEmit` vs `emitDeclarationOnly` vs `noEmitOnError` do in real projects?

**Answer:**

- `noEmit`: type-check only, output nothing.
- `emitDeclarationOnly`: output `.d.ts` only.
- `noEmitOnError`: emit JS/types only if there are zero TS errors.

---

### 157) Explain `declaration`, `declarationMap`, and `sourceMap` - how do they help debugging/consumers?

**Answer:**

- `declaration`: produce `.d.ts` for consumers.
- `declarationMap`: map `.d.ts` back to `.ts` for editor navigation.
- `sourceMap`: map `.js` stack traces/debugging back to `.ts`.

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

---

### 158) What are TypeScript project references and when would you use `tsc -b`?

**Answer:**

Project references split large repos into buildable subprojects with dependency order. Use `tsc -b` in monorepos or large codebases for incremental, graph-aware builds.

```json
{
  "references": [{ "path": "../contracts" }]
}
```

---

### 159) How does incremental compilation work and what files does TS generate for it?

**Answer:**

With `incremental: true`, TS stores prior build graph/signatures in `.tsbuildinfo`, then recompiles only affected files.

```json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./.tsbuildinfo"
  }
}
```

---

### 160) What problems does `isolatedModules` catch, and why is it important with Babel/esbuild transpilation?

**Answer:**

It rejects patterns that require cross-file type analysis, because Babel/esbuild transpile one file at a time.

Common catches:
- type-only exports used as values
- `const enum` usage that requires TS transform
- namespaces in module code

---

### 161) What does `verbatimModuleSyntax` do and how can it break builds when mixed with CJS/ESM?

**Answer:**

It preserves import/export syntax as written and requires explicit `import type` for type-only imports. Builds can break if runtime module format (CJS/ESM) does not match your import style.

Example: ESM `import` kept verbatim, but output/runtime expects CommonJS.

---

### 162) Explain the difference between `moduleResolution: Node`, `Node16`, and `NodeNext` (practical impact).

**Answer:**

- `Node`: older Node/CommonJS-style resolver.
- `Node16`: honors modern Node rules (`type`, `exports`, ESM extension rules) with Node 16 behavior.
- `NodeNext`: like `Node16` but follows latest Node resolution behavior.

For modern Node apps/libraries, `NodeNext` is usually safest.

---

### 163) What are `package.json` `exports` and `imports` fields, and how do they affect TypeScript resolution?

**Answer:**

- `exports`: public entry points for consumers.
- `imports`: private alias map (usually `#alias`) inside the package.

TS can resolve through them (with matching options), which keeps type resolution consistent with Node runtime resolution.

---

### 164) When would you enable `resolvePackageJsonExports` / `resolvePackageJsonImports` and what breaks if you do not?

**Answer:**

Enable them when your dependencies or package use `exports`/`imports`. If disabled, TS may resolve a different file than Node, causing "compiles but fails at runtime" issues.

---

### 165) What is `allowImportingTsExtensions` and when is it needed?

**Answer:**

It allows imports like `import "./x.ts"`. Needed in TS-first runtime flows (for example some test runners, Deno/Bun-like flows, or no-emit pipelines) where `.ts` is executed/resolved directly.

For normal `tsc` emit to JS, it is usually unnecessary.

---

### 166) Explain the difference between `esModuleInterop`, `allowSyntheticDefaultImports`, and CJS default imports.

**Answer:**

- `allowSyntheticDefaultImports`: type-check convenience only.
- `esModuleInterop`: adds emit helpers and enables safer default interop with CommonJS.
- CJS default imports may type-check but fail at runtime without compatible emit/bundler behavior.

---

### 167) How do you type JSON imports (`resolveJsonModule`) and what are the runtime considerations?

**Answer:**

Enable `resolveJsonModule` and TS infers JSON shape.

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

Runtime must also support JSON imports for your module system (Node ESM rules differ from CJS/bundlers).

---

### 168) What is `downlevelIteration` and when do you need it?

**Answer:**

It emits iterator-safe code for `for...of`, spread, and destructuring when targeting older JS (for example ES5). Needed when iterating non-array iterables like `Map`, `Set`, and strings in downlevel targets.

---

### 169) What does `useDefineForClassFields` change, and why does it matter with decorators and legacy class field semantics?

**Answer:**

It switches class field emit to standard `define` semantics instead of legacy assignment semantics. This affects initialization timing and interaction with decorators/accessors.

During migrations, this can change runtime behavior even if types still pass.

---

### 170) Explain `strictFunctionTypes` and one real bug it prevents in callback-heavy code.

**Answer:**

It enforces safer function parameter variance. Prevents assigning a callback that expects a narrower type where a wider type may be passed.

```ts
type Animal = { name: string };
type Dog = Animal & { bark(): void };

let handleAnimal: (a: Animal) => void;
const handleDog = (d: Dog) => d.bark();
// handleAnimal = handleDog; // rejected with strictFunctionTypes
```

---

## 7) Modules, Runtime vs Types, Declaration Spaces (171-184)

ASCII map:

```text
Type space (erased) != Value space (runtime)
```

### 171) Why do `__dirname` / `__filename` behave differently in ESM, and how do you type/work around it in TS?

**Answer:**

They are CommonJS globals and are not available in ESM modules. In ESM, derive them from `import.meta.url`.

```ts
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

---

### 172) How do you publish a TS library that supports both CommonJS and ESM (high level strategy)?

**Answer:**

Build two outputs (`dist/esm`, `dist/cjs`), publish one type surface, and use `exports` with `import`/`require` conditions.

```json
{
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.cjs"
    }
  }
}
```

---

### 173) What is `typesVersions` in package.json and when do library authors use it?

**Answer:**

`typesVersions` serves different type entry points by TS version. Library authors use it when newer TS syntax/types are not backward compatible with older TS compilers.

---

### 174) What is module augmentation and how is it different from global augmentation?

**Answer:**

- Module augmentation: extend types of a specific module.
- Global augmentation: extend global namespace/types for the whole program.

```ts
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}
```

---

### 175) How do you write a `global.d.ts` correctly, and what are common mistakes that make it not picked up?

**Answer:**

Put it under included paths and ensure it is a declaration file (no runtime code). Common mistakes:
- file excluded by `include`/`exclude`
- wrong folder not in `typeRoots` when custom roots are used
- adding imports unintentionally changing scope behavior

---

### 176) How do namespace declarations still show up in real codebases (legacy/global scripts) and what are the risks?

**Answer:**

They appear in legacy script projects and old declaration files. Risks: global pollution, name collisions, and harder migration to ES modules.

Prefer modules unless maintaining legacy interop.

---

### 177) Explain how tsconfig `include`/`exclude` interacts with files and references in monorepos.

**Answer:**

`include`/`exclude` applies per tsconfig. Referenced projects compile from their own configs, not parent include globs. In monorepos, missing references can silently skip type-checking package boundaries.

---

### 178) How do you avoid accidentally importing a type-only symbol at runtime (and breaking bundlers)?

**Answer:**

Use `import type` for types and keep `verbatimModuleSyntax` enabled so TS does not rewrite imports ambiguously.

```ts
import type { User } from "./types";
import { makeUser } from "./runtime";
```

---

### 179) What is the difference between `import type` and `export type`, and when must you use them?

**Answer:**

- `import type`: brings in declarations erased at runtime.
- `export type`: re-exports declarations only.

You should use them when the symbol is type-only, especially with strict ESM settings and `verbatimModuleSyntax`.

---

### 180) How do you type `require()` imports in TS and what changes when you switch to ESM imports?

**Answer:**

In CJS TS, use `import x = require("x")` or `const x = require("x")` (with Node types). In ESM, switch to `import` syntax and ensure module/resolution settings align with Node ESM rules.

---

### 181) How would you migrate a Node backend from CJS to ESM in TS without breaking everything?

**Answer:**

Use staged migration:
- set `module`/`moduleResolution` to `NodeNext`
- convert leaf modules first
- replace CJS globals (`__dirname`, `require`) with ESM patterns
- update package `type`, `exports`, test tooling, and runtime scripts

---

### 182) How do you configure TS paths (`paths`) in a monorepo and make Jest and Node resolve them too?

**Answer:**

Define aliases in TS, then mirror them in runtime/test tooling.

- TypeScript: `baseUrl` + `paths`
- Jest: `moduleNameMapper`
- Node runtime: package `imports`/`exports`, bundler plugin, or path resolver hook

---

### 183) What is a path-alias pitfall that causes code to compile but fail at runtime?

**Answer:**

`tsc` does not rewrite alias imports by default. So code compiles, but Node cannot resolve `@app/foo` at runtime unless your runtime/bundler also knows that alias.

---

### 184) How do you generate and publish source maps correctly so stack traces point to `.ts` in production?

**Answer:**

Enable `sourceMap`, ship `.map` files with deployed JS, and run Node with source-map support.

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "inlineSources": true
  }
}
```

For Node, use `--enable-source-maps` (or equivalent runtime setting).

---

## 8) Advanced Type-System Edge Cases (185-204)

ASCII map:

```text
Value-level runtime safety + Type-level compile-time safety
```

### 185) How do you model "read-only at compile time" vs "immutable at runtime" in TS/JS?

**Answer:**

Use `readonly`/`Readonly<T>` for compile-time guarantees, and `Object.freeze` (or immutable data libraries) for runtime immutability.

```ts
const cfg: Readonly<{ port: number }> = { port: 3000 };
const frozen = Object.freeze({ port: 3000 });
```

---

### 186) What is the difference between `unknown` and `object` as a top-ish type for values?

**Answer:**

- `unknown`: truly any value, requires narrowing before use.
- `object`: any non-primitive value only.

`unknown` is safer for untrusted input.

---

### 187) Explain `unique symbol` and one place it is actually useful (branding, opaque keys).

**Answer:**

`unique symbol` creates a nominally distinct symbol type. Useful for hidden keys/branding that should not collide.

```ts
declare const Brand: unique symbol;
type UserId = string & { [Brand]: "UserId" };
```

---

### 188) What is the difference between `bigint` and `number` in TS and where does `bigint` show up in backend work?

**Answer:**

`number` is IEEE-754 floating point; `bigint` is arbitrary-precision integer. Use `bigint` for IDs/counters beyond `Number.MAX_SAFE_INTEGER`, financial integer math, and some DB/crypto domains.

---

### 189) How do you type `process.env` safely without sprinkling `as string` everywhere?

**Answer:**

Parse env once with a runtime schema, then export a typed config object.

```ts
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.coerce.number().int().positive()
});

export const env = EnvSchema.parse(process.env);
```

---

### 190) How do you model errors as data (typed error codes) instead of throwing raw `Error` everywhere?

**Answer:**

Use discriminated unions with explicit codes and metadata.

```ts
type AppError =
  | { code: "NOT_FOUND"; resource: string }
  | { code: "VALIDATION"; fields: string[] };
```

---

### 191) What is the difference between `Error`, custom error classes, and discriminated error unions?

**Answer:**

- `Error`: generic exception object.
- Custom classes: richer runtime behavior + `instanceof` checks.
- Discriminated unions: explicit typed error flows (great for non-throw result patterns).

Use unions for domain errors, classes for exception boundaries.

---

### 192) How do you type a `Result` pipeline where functions can short-circuit on error without exceptions?

**Answer:**

Model `Result<T, E>` and define `map`/`flatMap` helpers.

```ts
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function flatMap<A, B, E>(r: Result<A, E>, fn: (a: A) => Result<B, E>): Result<B, E> {
  return r.ok ? fn(r.value) : r;
}
```

---

### 193) How would you type a `mapAsync` helper that preserves tuple/array element types?

**Answer:**

Use const generics for tuples and a mapped tuple return type.

```ts
async function mapAsync<const T extends readonly unknown[], R>(
  items: T,
  fn: <I extends T[number]>(item: I, index: number) => Promise<R>
): Promise<{ [K in keyof T]: R }> {
  return Promise.all(items.map(fn)) as Promise<{ [K in keyof T]: R }>;
}
```

---

### 194) How do you type a function that returns different object shapes based on a boolean option parameter?

**Answer:**

Use overloads or conditional generics keyed by a boolean literal option.

```ts
function getUser(opts: { full: true }): { id: string; profile: { bio: string } };
function getUser(opts: { full: false }): { id: string };
function getUser(opts: { full: boolean }) {
  return opts.full ? { id: "1", profile: { bio: "x" } } : { id: "1" };
}
```

---

### 195) Explain how `as const` interacts with arrays/tuples and why readonly tuples matter.

**Answer:**

`as const` keeps literal element types and turns arrays into readonly tuples.

```ts
const pair = ["ok", 200] as const;
// type: readonly ["ok", 200]
```

This preserves exact positions/values for safer APIs.

---

### 196) What is the difference between `readonly string[]` and `ReadonlyArray<string>` and when does it matter?

**Answer:**

They are equivalent for normal use. `ReadonlyArray<T>` can be clearer in generic-heavy code, while `readonly T[]` is often more readable inline.

---

### 197) Explain the `satisfies` operator on arrays/tuples - what does it preserve that annotations lose?

**Answer:**

`satisfies` checks compatibility without widening away inferred literal details.

```ts
const routes = ["/", "/health"] as const satisfies readonly string[];
```

You keep the tuple literals while validating the broader contract.

---

### 198) How do you type a const generic parameter (TS 5.x) and why is it useful for literal preservation?

**Answer:**

Use `const` on generic params to keep literals/tuples exact through function boundaries.

```ts
function defineRoutes<const T extends readonly string[]>(routes: T) {
  return routes;
}
```

---

### 199) How do you enforce exhaustiveness without a default case in switch (pattern + benefit)?

**Answer:**

Switch on discriminant and add a post-switch `assertNever` check.

```ts
function assertNever(x: never): never {
  throw new Error(`Unhandled: ${String(x)}`);
}
```

Benefit: compiler fails when a new union member is added but not handled.

---

### 200) What are template literal types used for in APIs (routes, event names, env keys) beyond toy examples?

**Answer:**

They encode naming conventions and valid key patterns.

```ts
type EnvKey = `APP_${Uppercase<string>}`;
type UserEvent = `user:${"created" | "deleted"}`;
```

This catches invalid strings at compile time for route/event/env APIs.

---

### 201) Explain how conditional types can cause performance issues in TS (type instantiation depth) and how to simplify.

**Answer:**

Deep nested/distributive conditional types can explode instantiations and slow IDE/check times. Simplify by:
- reducing recursion depth
- avoiding unnecessary distributive behavior
- splitting mega-types into named intermediate helpers

---

### 202) What is the difference between `never` as "unreachable" vs `never` produced by distributive conditional types?

**Answer:**

- Unreachable `never`: control-flow impossibility (for example exhaustive switch remainder).
- Conditional `never`: type-level filtering result (for example `Extract`/`Exclude` branches removed).

Same type token, different cause.

---

### 203) How do you type recursive data structures safely (trees, JSON) without infinite recursion?

**Answer:**

Use explicit recursive aliases/interfaces and keep helper types shallow when possible.

```ts
type Tree<T> = { value: T; children: Tree<T>[] };
```

For advanced transforms, add depth limits to avoid type-instantiation blowups.

---

### 204) How do you represent JSON values as a TS type (`JsonValue`) and what are the tradeoffs?

**Answer:**

Use a recursive union:

```ts
type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [k: string]: JsonValue }
  | JsonValue[];
```

Tradeoff: accurate enough for JSON, but can be restrictive for app objects with methods, `Date`, `Map`, etc.

---

## 9) Practical Backend + AWS TS Usage (205-212)

### 205) How do you type `Map<K, V>` vs `Record<string, V>` and how do you choose between them?

**Answer:**

- `Record<string, V>`: plain object keyed by strings, easy JSON serialization.
- `Map<K, V>`: supports non-string keys, ordered iteration, explicit API.

Choose `Record` for config/DTO-like objects; choose `Map` for dynamic keyed collections.

---

### 206) How do you type `Set<T>` and what pitfalls happen when you try to store objects as keys?

**Answer:**

`Set<T>` stores unique values by reference equality for objects. Pitfall: two equal-looking object literals are different entries.

```ts
const s = new Set<{ id: string }>();
s.add({ id: "1" });
s.add({ id: "1" }); // still two items
```

Use stable IDs or canonical objects when deduping entities.

---

### 207) How do you type AWS Lambda handlers (`APIGatewayProxyEvent`/`Result`) and avoid `any` in `event.body`?

**Answer:**

Type the handler with AWS types, parse `event.body` as `unknown`, then validate.

```ts
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { z } from "zod";

const Body = z.object({ name: z.string().min(1) });

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const raw: unknown = event.body ? JSON.parse(event.body) : {};
  const body = Body.parse(raw);
  return { statusCode: 200, body: JSON.stringify({ ok: true, name: body.name }) };
};
```

---

### 208) How would you model an API contract shared between frontend and backend (DTOs + runtime validation strategy)?

**Answer:**

Create a shared contracts package with runtime schemas and inferred TS types.

```text
packages/contracts: zod schemas + exported inferred DTO types
frontend/backend: import same schema/types
runtime: validate external inputs at boundaries
```

This keeps compile-time and runtime contracts aligned.

---

### 209) What are the pros/cons of Zod `infer` types vs hand-written interfaces in large codebases?

**Answer:**

- Zod `infer` pros: single source of truth, runtime + compile-time alignment.
- Zod `infer` cons: heavy schema coupling everywhere, possible type complexity/perf costs.
- Hand-written interface pros: lightweight, explicit domain types.
- Hand-written interface cons: duplication risk against runtime validators.

---

### 210) In Jest, what is the difference between `jest.mocked()` and `as jest.Mock` casts, and why does it matter?

**Answer:**

`jest.mocked()` preserves the original module/function shape with typed mock methods. `as jest.Mock` is a blunt cast that can hide wrong signatures and reduce type safety.

Prefer `jest.mocked()` for safer refactors.

---

### 211) How do you ensure your TS types do not slow down IDEs (practical refactor tactics)?

**Answer:**

- Replace deeply recursive/distributive utility types with simpler explicit types.
- Cache complex computed types in named aliases.
- Split giant files/types into smaller modules.
- Avoid broad generic APIs where concrete types are enough.
- Measure with `tsc --extendedDiagnostics`.

---

### 212) What does `exactOptionalPropertyTypes` break most often during TS upgrades, and how do you fix it safely?

**Answer:**

It most often breaks code that assigns `undefined` to optional props expecting it to mean "absent." With this flag, `x?: T` does not imply `x: T | undefined`.

Safe fixes:
- omit property instead of setting `undefined`
- explicitly model `| undefined` where needed
- adjust patch/update DTOs to represent omission vs explicit null/undefined clearly

---
