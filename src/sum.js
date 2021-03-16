function Sum(){
    let value = 0;

    return function child(n){
        value +=n;

        if(!child.value){
            child.value = function(){
                return value;
            }
        }
        
        return child;
    }

    
    
}

const sum = new Sum();

const res = sum(1)(2)(3)(4).value();

console.log(res);