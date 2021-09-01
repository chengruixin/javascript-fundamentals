function clone(originalObj) {
    const visited = new Map();
    const clonedObj = Object.create(originalObj.__proto__);

    deepClone(originalObj, clonedObj, visited);

    return clonedObj;
}

function deepClone(originalObj, clonedObj, visited) {
    for (let key in originalObj) {
        if (isNotArrayOrObject(originalObj[key])) {
            clonedObj[key] = originalObj[key];
        } else {
            if (!visited.has(originalObj[key])) {
                clonedObj[key] = isArray(originalObj[key])
                    ? []
                    : Object.create(originalObj[key].__proto__);
                visited.set(originalObj[key], clonedObj[key]);
                deepClone(originalObj[key], clonedObj[key], visited);
            } else {
                clonedObj[key] = visited.get(originalObj[key]);
            }
        }
    }
}

function isNotArrayOrObject(variable) {
    if (variable === null || typeof variable !== "object") {
        return true;
    }

    return false;
}

function isArray(variable) {
    return Array.isArray(variable);
}

(function test() {
    const parent = {
        name: 3,
        age: 4,
    };
    const child = {
        name: 1,
        age: 2,
    };

    parent.child = child;
    child.parent = parent;

    
    console.log(child);

    console.log(clone(child));
})();
