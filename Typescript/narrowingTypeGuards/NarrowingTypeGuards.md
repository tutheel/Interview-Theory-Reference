# Chapter 8: Narrowing and Type Guards

## What you learn
- Control-flow based narrowing
- Built-in guards (`typeof`, `Array.isArray`)
- Custom type guards (`pet is Cat`)

## Why this matters
Type guards let you safely handle unions at runtime while keeping static type safety.

## Run
```bash
npm run build
node dist/narrowingTypeGuards/NarrowingTypeGuards.js
```

## Practice
- Add a third pet type and update the guard logic.
- Build a guard for an API result type.
- Use `in` operator narrowing with object unions.
