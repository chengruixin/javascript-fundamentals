let arr = [8,[12], 9, [1], [2],[[[[[[[[[[[[10,[1], [2],[1], [2]]]]]]]]]]]]]];


function recursiveFlat(arr){
    
    for(let i = 0; i<arr.length; i++){
    
        if(!Array.isArray(arr[i])) continue;
    
        let subArray = recursiveFlat(arr[i]);
        arr.splice(i, 1, ...subArray);

        //needs move pointer, in order to skip all subarray
        i = i + subArray.length - 1;
        
    }

    return arr;
}

function whileFlat(arr){
    let i = 0;

    while(i < arr.length){
        if(!Array.isArray(arr[i])) {
            i++;
            continue;
        }
        let extractedArray = arr[i];
        arr.splice(i, 1, ...extractedArray);
    }

    return arr;
}

function flattenArray(arr){
    const flattened = [].concat(...arr);
    return flattened.some(item => Array.isArray(item)) ?
    flattenArray(flattened) : flattened;
}
const arr2 = flattenArray(arr);

console.log(arr);
console.log(arr2);