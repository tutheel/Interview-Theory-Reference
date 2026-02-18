export {};

type IsString<T> = T extends string ? true : false;

type ApiResult<T> = T extends Error
  ? { ok: false; error: string }
  : { ok: true; data: T };

const checkA: IsString<string> = true;
const checkB: IsString<number> = false;

const success: ApiResult<number> = { ok: true, data: 99 };
const failure: ApiResult<Error> = { ok: false, error: "Something failed" };

console.log("IsString<string>:", checkA);
console.log("IsString<number>:", checkB);
console.log("Success result:", success);
console.log("Failure result:", failure);
