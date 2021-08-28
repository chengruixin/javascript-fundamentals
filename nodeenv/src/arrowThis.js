function getWindow(){
    

    

    const foo2 = function(){
       

        const foo = ()=>{
            return this;
        }

        console.log(foo());

        return this;
    }

    
    console.log(foo2.call(this));
}


let o = {name : 'd'};
getWindow.call(o);