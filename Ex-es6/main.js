// var p = new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     console.log("1")
//     resolve()
//   }, 1000)
// })
// p.then(function() {
//     console.log('2')
// });

// console.log("main")
// console.log(test())

async function test2() {
  console.log("f");
  let a = await Promise.resolve("zt77");
  return a;
}

(async function() {
  console.log(await test2());
  return "mmm";
})().then(data => {
  console.log(data);
})



