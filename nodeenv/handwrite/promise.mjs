const PENDING = Symbol("PENGINDG");
const FULFILLED = Symbol("FULLFILLED");
const REJECTED = Symbol("REJECTED");

export default function Promise(executor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    this.onFullfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    executor(this.resolve.bind(this), this.reject.bind(this));
}

Promise.prototype.resolve = function (value) {
    if (this.status === REJECTED || this.status === FULFILLED) {
        console.log("status change error", this.value);
        return;
    }

    this.status = FULFILLED;
    this.value = value;

    for (let callback of this.onFullfilledCallbacks) {
        callback(this.value);
    }
};

Promise.prototype.reject = function (reason) {
    if (this.status === FULFILLED || this.status === REJECTED) {
        console.log("status change error", this.reason);
        return;
    }

    this.status = REJECTED;
    this.reason = reason;

    for (let callback of this.onRejectedCallbacks) {
        callback(this.reason);
    }
};

Promise.prototype.then = function (resolveCallback, rejectCallback) {
    if (typeof resolveCallback !== "function") {
        resolveCallback = (v) => v;
    }

    if (typeof rejectCallback !== "function") {
        rejectCallback = (e) => {
            throw e;
        };
    }

    const p2 = new Promise((resolve, reject) => {
        if (this.status === FULFILLED) {
            queueMicrotask(() => {
                try {
                    const result = resolveCallback(this.value);
                    resolvePromiseProcedure(p2, result, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        } else if (this.status === REJECTED) {
            queueMicrotask(() => {
                try {
                    const result = rejectCallback(this.reason); // result => new value
                    resolvePromiseProcedure(p2, result, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        } else if (this.status === PENDING) {
            this.onFullfilledCallbacks.push((value) => {
                queueMicrotask(() => {
                    try {
                        const result = resolveCallback(value);
                        resolvePromiseProcedure(p2, result, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });

            this.onRejectedCallbacks.push((reason) => {
                queueMicrotask(() => {
                    try {
                        const result = rejectCallback(reason);
                        resolvePromiseProcedure(p2, result, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        } else {
            console.error("unexpected");
        }
    });

    return p2;
};

Promise.prototype.catch = function (rejectCallback) {
    if (typeof rejectCallback !== "function") {
        rejectCallback = (e) => {
            throw e;
        };
    }
    const p2 = new Promise((resolve, reject) => {
        if (this.status === FULFILLED) {
            queueMicrotask(() => {
                resolvePromiseProcedure(p2, this.value, resolve, reject);
            });
        } else if (this.status === REJECTED) {
            queueMicrotask(() => {
                try {
                    const result = rejectCallback(this.reason);
                    resolvePromiseProcedure(p2, result, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        } else if (this.status === PENDING) {
            this.onRejectedCallbacks.push((reason) => {
                queueMicrotask(() => {
                    try {
                        const result = rejectCallback(reason);
                        resolvePromiseProcedure(p2, result, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            this.onFullfilledCallbacks.push((passingThrough) => {
                queueMicrotask(() => {
                    resolvePromiseProcedure(
                        p2,
                        passingThrough,
                        resolve,
                        reject
                    );
                });
            });
        } else {
            console.error("unexpected");
        }
    });

    return p2;
};

function resolvePromiseProcedure(p2, result, resolve, reject) {
    if (p2 === result) {
        throw new ReferenceError("having two promises the same");
    }

    if (result instanceof Promise) {
        result
            .then((v) => {
                resolvePromiseProcedure(p2, v, resolve, reject);
            })
            .catch((err) => {
                reject(err);
            });

        return;
    }
    // Do not consider .then for the time being
    resolve(result);
}

Promise.all = function (arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError("Input should be an array");
    }
    const n = arr.length;
    return new Promise((resolve, reject) => {
        let count = 0;
        const results = new Array(n);

        for (let i = 0; i < n; i++) {
            Promise.resolve(arr[i])
                .then((v) => {
                    results[i] = v;
                    count++;

                    if (count >= n) {
                        resolve(results);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }
    });
};

Promise.race = function (arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError("Input should be an array");
    }
    return new Promise((resolve, reject) => {
        for (let p of arr) {
            // Promise.resolve(p).then( v => {
            //     resolve(v);
            // }).catch( e => {
            //     reject(e);
            // })
            Promise.resolve(p).then(resolve, reject);
        }
    });
};

Promise.resolve = function (toBeResolved) {
    return new Promise((resolve, reject) => {
        resolvePromiseProcedure(null, toBeResolved, resolve, reject);
    });
};

Promise.reject = function (toBeRejected) {
    return new Promise((resolve, reject) => {
        reject(toBeRejected);
    });
};
