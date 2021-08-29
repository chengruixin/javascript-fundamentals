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
    if (this.status === FULFILLED || this.status === REJECTED) {
        console.error(
            "RESOLVE: cannot set current promise status again",
            this.status
        );
        return;
    }

    this.value = value;
    this.status = FULFILLED;

    for (let callback of this.onFullfilledCallbacks) {
        callback(this.value);
    }
};

Promise.prototype.reject = function (reason) {
    if (this.status === FULFILLED || this.status === REJECTED) {
        console.error(
            "REJECT: cannot set current promise status again",
            this.status
        );
        return;
    }

    this.reason = reason;
    this.status = REJECTED;

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
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            });
        } else if (this.status === REJECTED) {
            queueMicrotask(() => {
                try {
                    const result = rejectCallback(this.reason);
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            });
        } else if (this.status === PENDING) {
            // TODO
            this.onFullfilledCallbacks.push((value) => {
                queueMicrotask(() => {
                    try {
                        const result = resolveCallback(value);
                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                });
            });

            this.onRejectedCallbacks.push((reason) => {
                queueMicrotask(() => {
                    try {
                        const result = rejectCallback(reason);
                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                });
            });
        } else {
            console.error("Unexpected happened");
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
        if (this.status === REJECTED) {
            queueMicrotask(() => {
                try {
                    const result = rejectCallback(this.reason);
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            });
        } else if (this.status === PENDING) {
            this.onRejectedCallbacks.push((reason) => {
                queueMicrotask(() => {
                    try {
                        const result = rejectCallback(reason);
                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                });
            });

            this.onFullfilledCallbacks.push((value) => {
                queueMicrotask(() => {
                    resolve(value);
                });
            });
        } else if (this.status === FULFILLED) {
            queueMicrotask(() => {
                resolve(this.value);
            });
        }
    });

    return p2;
};
