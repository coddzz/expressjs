const express = require('express')
const router = express.Router()
const path = require('path');

router.get('^/$|/index(.html)?',(req, res) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})

router.get('/new-page(.html)?',(req, res)=>{
    res.sendFile(path.join(__dirname,'..','views','new-page.html'))
})

router.get('/old-page(.html)?',(req, res) => {
    res.redirect(301,'new-page.html');
})

// req,res,next function
router.get('/demo(.html)?',(req, res, next)=>{
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
router.get('/chain(.html)?',[one,two,three])

module.exports = router;