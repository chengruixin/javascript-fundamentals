// var data = [];

// for(let i = 0; i<3;i++){
//     data[i] = (function(num){
//         return function(){
//             console.log(num);
//         }
        
//     })(i);
// }

// data[0]();
// data[1]();
// data[2]();

async function async1(){
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2(){
    await console.log('async2');
}

console.log('script start');
setTimeout(function(){
    console.log('setTimeout');
}, 0);

async1();

new Promise(function(resolve){
    console.log('promise1');
    resolve();
}).then(function(){
    console.log('promise2');
});

console.log('script end');