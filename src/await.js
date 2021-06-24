function wait1() {
    return new Promise(resolve =>
        setTimeout(resolve, 5 * 1000)
    )
}

function wait2() {
    return new Promise(resolve =>
        setTimeout(resolve, 1 * 1000)
    )
}

function wait3() {
    return new Promise(resolve =>
        setTimeout(resolve, 2 * 1000)
    )
}

async function main() {
    console.time();
    const x = wait1();
    const y = wait2();
    const z = wait3();
    await x;
    await y;
    await z;
    console.timeEnd();
}
    main();