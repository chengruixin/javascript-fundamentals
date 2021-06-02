const endpoint = "asdfasfasdfsdafa";

fetch(endpoint)
.then(response => response.json())
.then((data)=>{
    console.log(data);
})