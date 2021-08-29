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

function show() {
    console.log(this.name);
}

let a = {
    name: 1,
};

let b = {
    name: 2,
};

show.call(a);
show.call(b);
show.call();
