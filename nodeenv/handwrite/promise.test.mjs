import Promise from "./promise.mjs";

// Test: reject
// Promise.reject(new Promise((resolve) => {
//     resolve("should be an error")
// })).then().catch(d => {
//     console.log(d)
// })

// Test1
// let p = new Promise((resolve, reject) => {
//     resolve(1231);
// })
//     .catch()
//     .then(null, () => {
//         console.log("dsfdf");
//     })
//     .then((v) => {
//         return new Promise((resolve, reject) => {
//             console.log("s")
//             setTimeout(() => {
//                 reject(v);
//             }, 1000);
//         });
//     }).then().catch( e => {
//         console.log(e, "final")
//     })

// Test 2
// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("complete");
//         resolve(1);
//     }, 2500);
// });

// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(2);
//     }, 2000);
// });

// const p3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('p3 one')
//         resolve(3);
//     }, 1000);
// }).then((v) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log('p3 two')
//             resolve(v + 100);
//         }, 5000);
//     });
// });

// Promise.all([p1, p2, p3, "test", 898]).then((v) => {
//     console.log(v);
// });
/**
 * 
const listeners = [fn, fn, fn];

'event' triggered => for loop listeners fn() fn() fn()
new Promise(function(resolve,reject){
    
})

new Object()

new Constructor()
new Promise((resolve, reject) => {
    // resolve("hello");
    reject("error");
    // status pending -> fullfilled
    // status pending -> rejected
})


 * 
 */

// const p = new Promise((resolve, reject) => {
//     console.log("start a promise");

//     setTimeout(() => {
//         console.log("resolve it!!");
//         resolve("hello message");
//     }, 1000)
// }).then((v) => {
//     console.log("i GOT ", v)
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("another long wait");
//             resolve("final messa");
//         }, 3000)
//     });
// }).then( v => {
//     console.log("got", v);
// })
