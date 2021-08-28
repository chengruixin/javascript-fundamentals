// let a = (function foo(){
//     console.log('foo');
//     console.log(a === foo);
//     console.log(arguments.callee)
//     return 1;
// });

// (function foo(){
//     console.log('f2');
//     console.log(arguments.callee);
// })();

// a = a();
// console.log(a);

// foo();

var a = true;
function foo(){
    console.log("0");
}
if(a){
    function foo(){
        console.log("a");
    }
}

else{
    function foo(){
        console.log("b");
    }
}

foo = function(){
    console.log("c");
}

foo();