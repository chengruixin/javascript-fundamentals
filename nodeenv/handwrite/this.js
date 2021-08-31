var global;

(function () {
    global = this;
})();

Function.prototype.myCall = function (context, ...args) {
    const fn = this;
    context = !context ? global : context;
    context._fn = fn;

    const res = context._fn(...args);

    context._fn = undefined;
    delete context._fn;

    return res;
};

Function.prototype.myApply = function (context, args) {
    context = !context ? global : context;

    const fn = this;
    context._fn = fn;

    const result =
        args && args.length > 0 ? context._fn(...args) : context._fn();

    context._fn = undefined;
    delete context._fn;

    return result;
};

Function.prototype.myBind = function (context, ...args) {
    const fn = this;
    return function Fn(...args2) {
        // console.log([...args,...args2] === args.concat(args2));
        return fn.myApply(this instanceof Fn ? this : context, args.concat(args2)); // or [...args, ...args2]
    };
};

function foo() {
    console.log(this.a);
}
const obj = { a: 1 };

const newFooWithObj1 = foo.bind(obj);
const newFooWithObj2 = foo.myBind(obj);


new newFooWithObj1();
new newFooWithObj2();


new function Foo(a) {
    console.log(this);
    this.a = a;

    console.log(this);
}(1)

