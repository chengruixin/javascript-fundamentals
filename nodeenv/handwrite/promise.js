const PENDING = Symbol("PENGINDG");
const FULFILLED = Symbol("FULLFILLED");
const REJECTED = Symbol("REJECTED");

function Promise(executor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    executor()
}

// Promise.prototype.resolve = 