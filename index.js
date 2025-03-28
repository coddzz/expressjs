const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000;
const cors = require('cors')

const {logger} = require('./middleware/logEvents');


//built-in middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'./public')));

//custom middleware
app.use(logger)

// third-party middleware
//cross origin resoursce sharing
const whitelist = ['http://127.0.0.1:5500','http://localhost:3500']
const corsOptions = {
    origin: (origin, callback) =>{
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by Cors'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))


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
