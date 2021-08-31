function curry(fn) {
    return function temp(...args) {
        if (args.length < fn.length) {
            return temp.bind(this, ...args);
        } else {
            return fn.call(this, ...args);
        }
    };
}

function curry2(fn) {
    let totalArgs = [];

    return function temp(...args) {
        if (args.length) {
            totalArgs = totalArgs.concat(args);
            return temp;
        } else {
            return fn.apply(this, totalArgs);
        }
    };
}
function add(a, b, c, d, e) {
    //求和
    return a + b + c + d + e;
}
let addCurry = curry(add);
let f = addCurry(1)(2)(3)(4, 5);

