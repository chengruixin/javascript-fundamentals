let obj = {
    name : 'df'
}


Object.defineProperty(obj, "constructor", {
    enumerable : false,
    
    set(val){
        this._cons = val;
    },

    get(){
        return this._cons;
    }
})


obj.constructor = 1;
console.log(obj);
console.log(obj.constructor);

console.log(obj.constructor);
