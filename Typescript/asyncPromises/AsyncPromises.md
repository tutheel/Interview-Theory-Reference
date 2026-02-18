# Chapter 14: Async and Promises

## What you learn
- Typed `Promise<T>`
- `async/await`
- `Promise.all`
- Error handling with async code

## Why this matters
Most backend/frontend code is async. Type-safe async logic prevents data-shape mistakes.

## Run
```bash
npm run build
node dist/asyncPromises/AsyncPromises.js
```

## Practice
- Add a function that returns `Promise<number[]>`.
- Use `Promise.allSettled` and type-check each result.
- Add timeout handling with a typed wrapper.
