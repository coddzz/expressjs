const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000;

app.get('/',(req, res)=>{
    res.send('Hello World!!')
})

app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`))