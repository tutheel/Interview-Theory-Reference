# Chapter 12: Utility Types

## What you learn
- `Partial<T>`
- `Required<T>`
- `Pick<T, K>`
- `Record<K, V>`
- `Readonly<T>`

## Why this matters
Utility types reduce boilerplate and help quickly derive safe variants of existing types.

## Run
```bash
npm run build
node dist/utilityTypes/UtilityTypes.js
```

## Practice
- Use `Omit` to hide sensitive fields.
- Combine `Partial` + `Pick` for update payloads.
- Build a typed dictionary with `Record`.
