# Chapter 15: Error Handling and `never`

## What you learn
- Custom error classes
- Safe `catch` blocks with `unknown`
- Exhaustive checks with `never`

## Why this matters
Typed error handling avoids silent failures and makes edge cases explicit.

## Run
```bash
npm run build
node dist/errorHandling/ErrorHandling.js
```

## Practice
- Add another error type (`NetworkError`).
- Add a third `Shape` variant and update exhaustive logic.
- Return a result object instead of throwing.
