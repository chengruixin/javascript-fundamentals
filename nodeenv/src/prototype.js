function createObject(o){
    function F(){}

    F.prototype = o;

    return new F();
}


let person = {
    name : "ruixin",
    friends : ["a", "b"]
}

let clone1 = createObject(person);
let clone2 = createObject(person);
clone2.__proto__.name = "df";
console.log(clone1.name);
console.log(clone2.name);