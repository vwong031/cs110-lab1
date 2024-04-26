const url = 

fetch(url)
   .then(res => res.json()) .then(data => {  
   // do something with data

})
.catch(err => {
    // error catching
console.log(err) })