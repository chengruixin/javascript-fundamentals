
Function.prototype.myCall = function(context){
    context.fn = this;
    let params = '';
    for(let i = 1; i<arguments.length; i++){
        params += `arguments[${i}]`;
        if(i != arguments.length - 1) params += ','
    }
    let result = eval("context.fn(" + params + ");");

    delete context.fn;

    return result;
}

Function.prototype.myApply = function(context, args){
    if(!Array.isArray(args)) args = []; 

    context.fn = this;
    let params = '';
    for(let i = 0; i < args.length ; i++){
        params += `args[${i}]`;
        if(i != args.length - 1) params += ','
    }

    let result = eval("context.fn(" + params + ");");

    delete context.fn;
    return result;
    
}

Function.prototype.myBind = function(context, ...args){
    return (...args2)=>{
        let totalArgs = [...args, ...args2];
        return this.myApply(context, totalArgs);
    }
}
function getName(str1,str2, fn){
    return this.name + str1 + str2 + fn(str2);
}

let obj1 = {
    name :'abc'
}
let obj2 = {
    name : "dfdf"
}
let newWay = getName.myBind(obj1,' fdws ');
console.log(newWay(' dfd', s => s + 'f'));

/**
 * @copy from https://zhuanlan.zhihu.com/p/160315811 @Author : Venaissance
 * 
 * // 中级：兼容 ES5
    function bind_2(asThis) {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments, 1);
        var fn = this;
        if (typeof fn !== "function") {
            throw new Error("cannot bind non_function");
        }
        return function () {
            var args2 = slice.call(arguments, 0);
            return fn.apply(asThis, args.concat(args2));
        };
    }
 * 

// 高级：支持 new，例如 new (funcA.bind(thisArg, args))
function bind_3(asThis) {
  var slice = Array.prototype.slice;
  var args1 = slice.call(arguments, 1);
  var fn = this;
  if (typeof fn !== "function") {
    throw new Error("Must accept function");
  }
  function resultFn() {
    var args2 = slice.call(arguments, 0);
    return fn.apply(
      resultFn.prototype.isPrototypeOf(this) ? this : asThis, // 用来绑定 this
      args1.concat(args2)
    );
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}


 * 
 */