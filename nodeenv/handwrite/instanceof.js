function instanceOf(left, right) {
    let cur = Object.getPrototypeOf(left)
    while(cur) {
        if(cur === right.prototype) {
            return true;
        }
        cur = Object.getPrototypeOf(cur);
    }

    return false;
}


function P(){

}


function C() {

}

C.prototype = Object.create(P.prototype)
C.prototype.constructor = C;


let c = new C();

console.log(c instanceof P);
console.log(instanceOf(c, P));
