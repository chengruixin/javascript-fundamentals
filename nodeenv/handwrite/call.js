Function.prototype.call1 = function (context, ...args) {
    const fn = this;

    context._fn = fn;

    const res = context._fn(...args);

    context._fn = undefined;
    // delete context._fn;

    return res;
};

Function.prototype.myCall = function (context) {
    context.fn = this;
    let params = "";
    for (let i = 1; i < arguments.length; i++) {
        params += `arguments[${i}]`;
        if (i != arguments.length - 1) params += ",";
    }
    let result = eval("context.fn(" + params + ");");

    delete context.fn;

    return result;
};

const a = {
    a: 1,
};

function show() {
    console.log(this);
}

show.call({ b: 1 });
