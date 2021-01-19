function createObject(object){
    function F(){}
    F.prototype = object;
    return new F();
}

function inheritProperty(subType, superType){
    const clone = createObject(superType.prototype);
    clone.constructor = subType;
    subType.prototype = clone;
}

function ParentClass(name, age){
    this.name = name;
    this.age = age;
}

ParentClass.prototype.printInfo = function () {
    console.log(this.name , this.age);
}


function ChildClass(name, age, position){
    ParentClass.call(this, name, age);
    this.position = position;
}

inheritProperty(ChildClass, ParentClass);


const child = new ChildClass("ruixin",26, "leader");
child.printInfo();