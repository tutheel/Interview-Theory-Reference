# Chapter 17: Declaration Files and Third-Party Typing

## What you learn
- Ambient declarations with `declare`
- Extending global scope in a controlled way
- Typing external JavaScript APIs

## Why this matters
Not every JS library ships perfect typings. You should know how to declare missing type contracts.

## Run
```bash
npm run build
node dist/declarationFilesThirdParty/DeclarationFilesThirdParty.js
```

## Practice
- Create a custom `.d.ts` file for a mock JS library.
- Declare an external function and wrap it safely.
- Add stricter types for external API responses.
