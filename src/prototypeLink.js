function setPrototypeOf(source, target){
    source.__proto__ = target;
}

const  obj1 = {
    a : true
}

const obj2 = {
    b : true
}

setPrototypeOf(obj1, obj2);
console.log(obj1.b);