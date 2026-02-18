# TypeScript Learning Folder

This folder contains chapter-wise TypeScript tutorials.
Each chapter has:
- A runnable `.ts` file with `console.log` examples
- A matching `.md` tutorial file

## Setup

```bash
cd Typescript
npm install
npm run build
```

Compiled JavaScript is generated in `Typescript/dist/`.

## Run Any Chapter

1. Build everything:
```bash
npm run build
```
2. Run a chapter output file:
```bash
node dist/simpleTypes/simpleTypes.js
node "dist/Explicit&Inference/ExplicitAndInference.js"
node dist/unionTypes/UnionTypes.js
```

## W3Schools Coverage

Complete topic mapping is in:
- `Typescript/W3Schools_Topic_Map.md`

## Notes

- Some topics also have deeper/alternate chapters (example: `classesOOP`, `arraysTuplesEnums`, `narrowingTypeGuards`).
- This gives you both exact W3Schools-style chapters and expanded practice chapters.
