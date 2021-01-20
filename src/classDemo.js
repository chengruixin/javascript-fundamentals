class Demo {
    #name;
    constructor(name){
        this.#name = name;
    }
    printInfo(){
        console.log(this.#name + " from prototype");
        console.log(this.name + " from prototype");
    }

    static hello(){
        console.log("hello");
    }
}



let d = new Demo("ruixin");

Demo.hello();
d.constructor.hello();