function deepClone(source, visited = new Map()) {
    const keys = Object.keys(source);
    const target = isArray(source) ? [] : {};
    const len = isArray(source) ? source.length : keys.length;

    for(let i = 0; i < len; i += 1) {
        const curIdx = isArray(source) ? i : keys[i];
        const curItem = isArray(source) ? source[i] : source[keys[i]];

        if(isObject(curItem) || isArray(curItem)) {
            if(!visited.has(curItem)) {
                visited.add(curI);
                let cloned= deepClone(curItem);
                
                target[index] = cloned;
            } else {
                target[curIdx] = curItem;
            }
        } else if (isFunction(curItem)) {
            target[curIdx] = cloneFunction(curItem)
        } else {
            target[curIdx] = curItem
        }
    }

    return target;
}

function cloneFunction(fn) {
    return fn;//temp
}

function isObject(unknownType) {
    return Object.prototype.toString.call(unknownType) === "[object Object]"
}

function isFunction(unknownType) {
    return Object.prototype.toString.call(unknownType) === "[object Function]"
}

function isArray(unknownType) {
    return Object.prototype.toString.call(unknownType) === "[object Array]"
}


(function test(){
    let obj = {
        a : "hello",
        good : "there",
        arr : [1, 2, 3],
        obj1 : {
            k1 : 1,
            k2 : true,
            k3 : undefined,
            k4 : [
                {}, {}, {}
            ]
        }
    }

    let newObj = deepClone(obj);
    newObj.obj1.k1 = 100;
    console.log(newObj);
    console.log(obj);
})();