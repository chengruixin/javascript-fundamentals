class MyScrets {
    static #sid = 1;
    name;
    age;
    id;
    constructor(name, age){
        this.id = MyScrets.#sid;
        this.name = name;
        this.age = age;
    }

    setName(name){
        this.name = name;
    }

    setAge(age){
        this.age = age;
    }

    getName(){
        return this.name;
    }

    getAge(){
        return this.age;
    }
}

function createUser(name, age){
    let user = new MyScrets(name, age);
    // return user;
    return Object.freeze(user);
}

const u1 = createUser("ruixin", 25);
console.log(u1);
u1.age = 12;
u1.dd = "1"
console.log(u1);

