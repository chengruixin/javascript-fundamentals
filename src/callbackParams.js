function foo(a,b, callback){
    callback(a,b);
}

foo(1,2,function(a,b){
    console.log(a+b);
})