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

ChildClass.prototype = new ParentClass();

const child = new ChildClass("ruixin", 3, "dfd");
child.printInfo();