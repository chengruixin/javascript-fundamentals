const PENDING = Symbol("PENGINDG");
const FULFILLED = Symbol("FULLFILLED");
const REJECTED = Symbol("REJECTED");

export default function MyPromise(executor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    this.onFullfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    executor(this.resolve.bind(this), this.reject.bind(this));
}

MyPromise.prototype.resolve = function (value) {
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

MyPromise.prototype.reject = function (reason) {
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

MyPromise.prototype.then = function (resolveCallback, rejectCallback) {
    if (typeof resolveCallback !== "function") {
        resolveCallback = (v) => v;
    }

    if (typeof rejectCallback !== "function") {
        rejectCallback = (e) => {
            throw e;
        };
    }

    const p2 = new MyPromise((resolve, reject) => {
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

MyPromise.prototype.catch = function (rejectCallback) {
    if (typeof rejectCallback !== "function") {
        rejectCallback = (e) => {
            throw e;
        };
    }
    const p2 = new MyPromise((resolve, reject) => {
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

    if (result instanceof MyPromise) {
        result
            .then((v) => {
                console.log(v);
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
