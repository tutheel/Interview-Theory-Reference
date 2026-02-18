# Chapter 7: Type Aliases and Type Assertions

## What you learn
- Reusable type aliases with `type`
- Generic aliases (`ApiResponse<T>`)
- Type assertions (`as SomeType`)
- Non-null assertion (`!`)

## Why this matters
Aliases improve readability. Assertions help when TypeScript needs extra information, but use them carefully.

## Run
```bash
npm run build
node dist/typeAliasesAssertions/TypeAliasesAssertions.js
```

## Practice
- Create a generic alias for paginated responses.
- Parse JSON with a safer runtime check before assertion.
- Remove `!` and handle undefined explicitly.
