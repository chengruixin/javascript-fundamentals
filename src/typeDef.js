let num = 1
let str = "string"
let bool = true
let bigInt = 1n;
let sym = Symbol("hello");
let arr = [1, 2, 3];
let fn = function(){}
let afn = () => {}
let obj = {};

obj.__proto__ = Array.prototype;
console.log(typeof num)
console.log(typeof str)
console.log(typeof bool)
console.log(typeof bigInt)
console.log(typeof sym)
console.log(typeof null)
console.log(typeof undefined)
console.log(arr instanceof Object)
console.log(obj instanceof Array);
console.log(typeof fn, typeof afn)
console.log(afn instanceof Object)
console.log(Object.prototype.toString.call(arr));