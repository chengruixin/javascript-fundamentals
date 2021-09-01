// 1 . dps bfs
// 2. JSON.stringfy() -> remove '[', ']' -> return array
// 3. arr.toString().split(",")
// 4. es6 flat()

let arr = [1, [2, [3, 4]]];
function flatten(arr) {
    return arr.flat(1); // depth of the flatten array, default is 1.
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]
