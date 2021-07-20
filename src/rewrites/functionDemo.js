
function fib(n){
    if(n<= 2) return 2;
    
    if(!fib.answers) fib.answers = {};

    if(fib.answers[n]) return fib.answers[n];
    console.log(n);
    let result = fib(n-1) + fib(n-2);
    fib.answers[n] = result;
    return result;
}

function longTask(n){
    if(!longTask.answers) longTask.answers = {};

    if(longTask.answers[n]) return longTask.answers[n];

    for(let i = 0; i < 999999999; i++){

    }
    longTask.answers[n] = n;
    return n;
}
// let ans = fib(100);

function foo(){
    console.log(foo);
}
let 中 = 'df';
console.log(中);
// let getMin = new Function('a', 'b','c','d', 'return a < b ? a + c : b + d');

// console.log(getMin(10,100,1,2));