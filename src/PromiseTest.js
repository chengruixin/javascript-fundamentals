const p = new Promise((resolve, reject)=>{
    // resolve(1); 
    // reject(2);

    setTimeout(()=>{
        // resolve(12312);
        reject(new Error('fd'));
    }, 1000);
    
}).then( data => {
    console.log(data + " with success and add it one");
    return data + 1;
}).then(data=>{
    console.log(data, " second then");
    return data + 100;
}).then(data => {
    console.log("finally", data);
}, err => {
    console.log('hello this is err00', err);
})