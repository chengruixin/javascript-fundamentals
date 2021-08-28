try {
    Promise.resolve().then(() => {throw new Error('Whoops.')})
    } catch (e) {
    console.log('sdfasdf');
    }