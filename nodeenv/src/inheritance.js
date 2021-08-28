function create(o){
    function F(){}
    F.prototype = o;
    return new F();
}

function inheritPrototype(source, target){
    const prototype = create(target.prototype);
    source.prototype = prototype;
    prototype.constructor = source;
}

function instanceOf(obj, target){
    let proto = obj.__proto__;
    while(proto != target.prototype){
        proto = proto.__proto__;
        if(proto === null) return false;
    }

    return true;
}
function Foo(){

}

Foo.prototype.print = function(){
    console.log("ff");
}

function Bar(){
    Foo.call(this);
}

inheritPrototype(Bar, Foo);

const b = new Bar();

b.print();

const c = new b.constructor();

c.print();

console.log(Object.getPrototypeOf(c) === Object.getPrototypeOf(b));

function Noo(){}
console.log(instanceOf(c,Noo))