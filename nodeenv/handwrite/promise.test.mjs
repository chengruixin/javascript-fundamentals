// import Promise from "./promise.mjs";

let p = new Promise((resolve, reject) => {
    resolve(1231);
})
    .catch()
    .then(null, () => {
        console.log("dsfdf");
    })
    .then((v) => {
        return new Promise((resolve, reject) => {
            console.log("s")
            setTimeout(() => {
                reject(v);
            }, 1000);
        });
    }).then().catch( e => {
        console.log(e, "final")
    })

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
