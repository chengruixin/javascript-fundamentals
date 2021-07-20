const net = require("net");


const clientSocket = new net.Socket();

clientSocket.connect({
    port : 80,
    // host : "abccc.azurewebsites.net",
    host : "www.baidu.com"
});

clientSocket.on('connect', ()=>{
    console.log("connected!");
    let str = "";
    str += "GET / HTTP/1.1\r\n";
    str += "Host: www.baidu.com\r\n";
    str += "Accept : text/html\r\n";
    str += "\r\n";
    // str += " I love you ";
    // console.log(str);
    clientSocket.end(str);
   
})
console.log(3998 + 7923 + 1360 + 1959);
let count = 0;
clientSocket.on('data', (data)=>{
    console.log(count++);
    console.log(data.toString());
})
clientSocket.on('error', ()=>{
    console.log("error!");
})

clientSocket.on('close', ()=>{
    console.log("closed");
})