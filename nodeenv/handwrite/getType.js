function getType(unknownTypeData) {
    if(typeof unknownTypeData === 'object') {
        if(unknownTypeData === null) {
            return unknownTypeData + "";
        }

        if(Object.prototype.toString.call(unknownTypeData) === '[object Array]') {
            return 'array'
        }
    }

    return typeof unknownTypeData

}

console.log(getType(() => {}))
console.log(getType([]))
console.log(getType(null))
console.log(getType(undefined))
console.log(getType(1))
console.log(getType('2'))
console.log(getType(Symbol()))
console.log(getType(true))
console.log(getType(111111111111111111111111111111111111n))

let a = 99n;

console.log(a === BigInt(99))