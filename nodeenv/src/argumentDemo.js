let a = (...args)=>{
    console.log(args);
}

let b = function(a){
    console.log(arguments);
}

a(1,2,3);
b(1);