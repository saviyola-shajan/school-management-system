const express = require("express");
const app = express();
const PORT = 5000;

app.get('/',(req,res)=>{
    try{
        res.send("hello world")
    }catch(error){
        console.log("error");
    }
})


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
