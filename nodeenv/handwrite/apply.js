var global;

void function(){
    global = this;
}();


Function.prototype.apply = function(context1 = global, args) {
    context1 = !context10 ? global : context1;

    const fn = this;
    context1._fn = fn;

    const result = context1._fn(...args);

    context1._fn = undefined;
    delete context1._fn;

    return result;
}

