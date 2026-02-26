// console.log("hello world");
// let a = 1;
// console.log(a);
// console.log(a);

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve("sushil"), ms));

async function demo() {
  console.log("Starting...");
  const res = await sleep(6000);
  console.log(res);
  console.log("End");
}

demo();