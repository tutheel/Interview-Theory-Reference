//1
function logUser() {
  return new Promise((resolve, rejected) => {
    setTimeout(() => resolve({ id: 1, name: "sushil" }), 4000);
  });
}

logUser()
  .then((user) => console.log("User Name is ", user.name))
  .catch((err) => console.log("error:", err));

//2
new Promise((resolve, reject) => {
  if (Math.random() > 0.5) resolve("success");
  else reject(new Error("failed"));
})
  .then((v) => console.log(v))
  .catch((e) => console.error(e.message));

//3
const sleep = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve("sushil"), ms));

async function demo() {
  console.log("Starting...");
  const res = await sleep(2000);
  console.log(res);
  console.log("End");
}

demo();

//4
const retryLogic = async (fn, retries) => {
  let errorRes;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      errorRes = error;
    }
  }
};

retryLogic(async () => {
  count++;
  if (count < 3) throw new Error("failed");
  return "Success";
}, 100)
  .then(console.log)
  .catch(console.log);
