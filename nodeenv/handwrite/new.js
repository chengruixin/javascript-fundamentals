function myNew(constructor, ...args) {
    const newBorn = {};
    Object.setPrototypeOf(newBorn, constructor.prototype);

    // const newBorn = Object.create(constructor.prototype);

    const result = constructor.apply(newBorn, args);

    if (
        result !== null &&
        (typeof result === "object" || typeof result === "function")
    ) {
        return result;
    }
    return newBorn;
}

function Cons(name, age) {
    this.name = name;
    this.age = age;

    // return function f(){};
    return null;
}

const o1 = myNew(Cons, "a", 23);
const o2 = new Cons("asdf", 2);

console.log(o1);
console.log(o2);
