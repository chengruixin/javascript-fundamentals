function addMethod(object, name, fn) {
    //定义个old参数用来记录前一次添加方法是的变量
    //通俗点讲，就是记录上一次添加方法是的下面这个function.
　　var old = object[name];
　　object[name] = function() {
　　    //如果调用object[name]方法时，传入的参数个数跟预期的一致，则直接调用
　　　　if(fn.length === arguments.length) {
　　　　　　return fn.apply(this, arguments);
　　　　} // 如果参数个数不同，判断old是否是函数，如果是，就调用old
　　　　  // old存的是上一次添加的方法，到里面又继续判断，直到找到参数个数相同为止
　　　　else if(typeof old === "function") {
　　　　　　return old.apply(this, arguments);
　　　　}
　　}
}

var people = {
　　values: ["Dean Edwards", "Alex Russell", "Dean Tom"]
};

// 不传参数的情况
addMethod(people, "find", function() {
　　return this.values;
});

// 传1个参数的情况
addMethod(people, "find", function(firstName) {
　　var ret = [];
　　for(var i = 0; i < this.values.length; i++) {
　　　　if(this.values[i].indexOf(firstName) === 0) {
　　　　　　ret.push(this.values[i]);
　　　　}
　　}
　　return ret;
});

// 传2个参数的情况
addMethod(people, "find", function(firstName, lastName) {
　　var ret = [];
　　for(var i = 0; i < this.values.length; i++) {
　　　　if(this.values[i] === (firstName + " " + lastName)) {
　　　　　　ret.push(this.values[i]);
　　　　}
　　}
　　return ret;
});

//不传参数的情况，因为是第一个定义，所以要逐层往上找，这里定义了三种情况，所以要找3次能找到正确的执行函数
console.log(people.find()); //["Dean Edwards", "Alex Russell", "Dean Tom"]
//传1个参数的情况，因为是第二个定义，所以要逐层往上找，这里定义了三种情况，所以要找2次能找到正确的执行函数
// console.log(people.find("Dean")); //["Dean Edwards", "Dean Tom"]
// //传2个参数的情况，因为是第三个定义，这里就定义了三种情况，所以第1次就能找到正确的执行函数
// console.log(people.find("Dean","Edwards")); //["Dean Edwards"]

