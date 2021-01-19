const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function XPromise(callbackFn){
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
   
    callbackFn(this.resolve.bind(this), this.reject.bind(this));
}

XPromise.prototype.resolve = function(value){
    if(this.status !== PENDING || this.status === REJECTED){
        return;
    }

    this.status = FULFILLED;
    this.value = value;

    //Make all callbacks in array to be called with value passed in.
    for(let i = 0; i < this.onFulfilledCallbacks.length; i++){
        queueMicrotask( this.onFulfilledCallbacks[i]);
    }

}

XPromise.prototype.reject = function(reason) {
    if(this.status !== PENDING || this.status === FULFILLED) {
        return;
    }

    this.status = REJECTED;
    this.reason = reason;

    //Make all callbacks in array to be called with value passed in.
    for(let i = 0; i < this.onRejectedCallbacks.length; i++){
        queueMicrotask( this.onRejectedCallbacks[i]);
    }
}

XPromise.prototype.then = function(onFulfilled, onRejected){
    
    if(typeof onFulfilled !== 'function') {
        onFulfilled = v => v;
    }

    if(typeof onRejected !== 'function') {
        onRejected = e => { throw e };
    }
    let promise2 = new XPromise((resolve, reject)=> {
        try {
            let x;

            const successCallback = () => {
                try{
                    if(x) return; // if it is already being set

                    x = onFulfilled(this.value);

                    promiseResolveProcedure(promise2, x, resolve, reject);

                } catch (e) {
                    reject(e);
                }

            }

            const failureCallback = () => {
                try {
                    if(x) return; // if it is already being set

                    x = onRejected(this.reason);
    
                    promiseResolveProcedure(promise2, x, resolve, reject);

                } catch (e) {
                    reject(e);
                }
               
            }

            if(this.status === PENDING){
                this.onFulfilledCallbacks.push(successCallback);
                this.onRejectedCallbacks.push(failureCallback);
            }
        
            else if(this.status === FULFILLED){
                queueMicrotask(successCallback)
            }
        
            else if(this.status === REJECTED) {
                queueMicrotask(failureCallback);
            }
        } catch (e) { // 2.2.7.2
            reject(e);
        }
        
    })
    
    return promise2;

}


function promiseResolveProcedure(promise2, x, resolve, reject){
    if(promise2 === x) {
        reject(new TypeError("promise2 is equal to x"));
        return;
    }

    if(x instanceof XPromise) {
        if (x.status === PENDING) {
            x.then( data => {
                promiseResolveProcedure(promise2, data, resolve, reject);
            });
        } else if (x.status === FULFILLED) {
            x.then( data => {
                resolve(data);
            });
        } else if (x.status === REJECTED) {
            x.then( data => {
                reject(data);
            })
        }

        return;
    }

    if(typeof x === 'object' || typeof x === 'function'){
        try {
            let then = x.then;
            let called = false;
            if(typeof then === 'function') {

                try {
                    then.call(x, resolvePromise, rejectPromise);
                    const resolvePromise = (y) => {
                        if(called) return;
                        called = true;
                        promiseResolveProcedure(promise2, y, resolve, reject);
                    }

                    const rejectPromise = (r) => {
                        if(called) return;
                        called = true;
                        reject(r);
                    }
                } catch (e) {
                    if(called) return;
                    reject(e);
                }
                
            } else {
                resolve(x);
            }

        } catch(e) {
            reject(e);
        }
        
    } else {
        resolve(x);
    }

}
/** Test */
(function Test(){
    const p = new XPromise((resolve, reject)=>{
        
        setTimeout(()=>{
            resolve(666);
        }, 300);
        
    }).then( data => {
        console.log(data, " with success and add it five");
        return new XPromise((resolve, reject) => {
            setTimeout(()=>{
                resolve(5 + data);
            }, 300);
        });
    }).then(data=>{
        console.log(data, " second then");
        return data + 600;
        // return new Error("aborted!");
    }).then(data => {
        console.log("finally", data);
    }, err => {
        console.log('hello this is err00', err);
    })

})();

// Test();