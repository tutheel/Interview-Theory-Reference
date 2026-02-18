# Chapter 6: Unions, Intersections, and Literal Types

## What you learn
- Union types (`A | B`)
- Intersection types (`A & B`)
- Literal types (exact string/number values)

## Why this matters
These are core tools for modeling real-world API responses and domain constraints.

## Run
```bash
npm run build
node dist/unionsIntersectionsLiterals/UnionsIntersectionsLiterals.js
```

## Practice
- Add a `"wallet"` payment method.
- Create a union for `Loading | Loaded | Failed` states.
- Build an intersection for `User` + `Permissions`.
