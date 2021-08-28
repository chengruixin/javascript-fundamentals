function GrandParent(){

}

function Parent(){

}

Parent.prototype = new GrandParent();

function Child(){

}

Child.prototype = new Parent();

const c = new Child();



GrandParent.prototype.PRINT = function(){
    console.log(this.name);
}

c.name = "fdfd";
c.PRINT();