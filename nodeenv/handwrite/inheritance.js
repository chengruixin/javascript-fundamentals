function Parent(arg) {
    this.fromParent = "1"
}

function inherit(child, parent) {
    const childprototype = Object.create(parent);
    childprototype.constructor = child;
    child.prototype = childprototype;
}

// run inheirt after a child class is created