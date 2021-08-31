const Event = (function () {
    const eventHub = {};
    const cahcedActions = {};
    function listen(key, fn) {
        if (!eventHub[key]) {
            eventHub[key] = [];
        }
        eventHub[key].push(fn);
    }

    function dispatch(key, ...args) {
        if (!eventHub[key]) {
            return;
        }

        const callbacks = eventHub[key];

        for (let callback of callbacks) {
            callback.apply(this, args);
        }
    }

    function remove(key, fn) {
        if (!eventHub[key]) return;

        const callbacks = eventHub[key];

        for (let i = 0; i < callbacks.length; i++) {
            if (callbacks[i] === fn) {
                callbacks.splice(i, 1);
                i--;
            }
        }
    }

    return {
        listen,
        dispatch,
        remove,
    };
})();

const fn1 = function (e, b) {
    console.log(e, b);
};

const fn2 = function () {
    console.log("fn2");
};

Event.listen("click", fn1);
Event.listen("click", fn1);
Event.listen("click", fn2);
Event.listen("click", fn1);
Event.listen("click", fn1);
Event.listen("click", fn1);
Event.listen("click", fn2);
Event.listen("click", fn2);
Event.listen("click", fn2);

// Event.dispatch("click", "arg1", "arg2");

Event.remove("click", fn2);

Event.dispatch("click", "arg1", "arg2");

Event.remove("click", fn1);
Event.dispatch("click", "arg1", "arg2");
