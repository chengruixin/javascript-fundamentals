// rewrite Object.create function
function create(object) {
    function f(){}
    f.prototype = object;
    return new f();
}