const p = new Promise((resolve,reject)=> {
    setTimeout(()=>{
        reject(1);
    }, 500)
}).catch( err => {
    console.log(err, "from catch");
    return err;
}).then( data => {
    console.log("got data", data);
})