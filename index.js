const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000;

app.get('^/$|/index(.html)?',(req, res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.get('/new-page(.html)?',(req, res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'))
})

app.get('/old-page(.html)?',(req, res) => {
    res.redirect(301,'new-page.html');
})


// req,res,next function
app.get('/demo(.html)?',(req, res, next)=>{
    console.log("demo page ")
    next()
},(req, res)=>{
    res.send("hello world!!")
})

// Chain Method
const one = (req, res, next) =>{
    console.log("one")
    next()
}
const two = (req, res, next) =>{
    console.log("two")
    next()
}
const three = (req, res) =>{
    console.log("three")
    res.send("Finished!!")
}
app.get('/chain(.html)?',[one,two,three]);


app.get('/*',(req, res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})



app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));
