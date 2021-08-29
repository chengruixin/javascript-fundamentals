function throttle(fn, wait) {
    let timer;
    return (...args) => {
        if(timer) {
            return;
        }
        fn.apply(this, args);
        timer = setTimeout(() => {  
            timer = null;
        }, wait);
    }
}

function throttle2(fn, wait) {
    let curTime = Date.now();

    return (...args) => {
        let newTime = Date.now();

        if(newTime - curTime >= wait) {
            curTime = newTime;
            fn.apply(this.args);
        }
    }
}
export default throttle2;