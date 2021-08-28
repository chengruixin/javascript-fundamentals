var window;

(function assignWindow(){
    window = this;
})();


Function.prototype.softBind = function(obj) {
    var fn = this;
    var curried = [].slice.call(arguments, 1);
    var bound = function () {
        console.log("this is :", this);
        // console.log("obj is ", obj);
        // console.log("this does not exist:", !this);
        // console.log("this equals to window or global", this === (window || global));
        return fn.apply(
            (!this || this === (window || global)) ?
            obj : this,
            curried.concat.apply(curried, arguments)
        );
    };
    
    bound.prototype = Object.create(fn.prototype);
    
    return bound;
}

function foo(){
    console.log("Name is", this.name);
}

foo.printInfo = function(){
    console.log("you found me!");
}

var obj1 = { name : "obj1"},
    obj2 = {name : "obj2"},
    obj3 = {name : "obj3"};

var fooObj = foo.softBind(obj1);

fooObj();

obj2.foo = foo.softBind(obj1);
obj2.foo();

fooObj.call(obj3);

setTimeout(obj2.foo, 10);