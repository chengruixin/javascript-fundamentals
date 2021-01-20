// var a = 1;
// var b = 2;
// function *foo() {
//     a++;
//     yield;
//     b = b * a;
//     a = (yield b) + 3;
// }
// function *bar() {
//     b--;
//     yield;
//     a = (yield 8) + b;
//     b = a * (yield 2);
// }

// function step(gen) {
//     var it = gen();
//     var last;
//     return function() {
//         // 不管yield出来的是什么，下一次都把它原样传回去！
//         last = it.next( last ).value;
//     };
// }

// void function(){
//     a = 1;
//     b = 2;
//     var s1 = step( foo );
//     var s2 = step( bar );
//     // 首次运行*foo()
//     s2();
//     s2();
//     s1();
//     // 现在运行*bar()
//     s1();
//     s2();
//     s2();
//     s1();
//     console.log( a, b ); // 11 22
// }();

var something = (function(){
    var nextVal;
    return {
        // for..of循环需要
        [Symbol.iterator]: function(){
           
            return this; 
        },
        // 标准迭代器接口方法
        next: function(){
            if (nextVal === undefined) {
                nextVal = 1;
            }
            else {
                nextVal = (3 * nextVal) + 6;
            }
            return { done:false, value:nextVal };
            }
    };

})();

for (var v of something) {
    console.log( v );
    // 不要死循环！
    if (v > 1000) {
    break;
    }
   }

// console.log(something.next()); // 1
// console.log(something.next()); // 1
// console.log(something.next()); // 1
// console.log(something.next()); // 1

