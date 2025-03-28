const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000;

const errorHandler = require('./middleware/errorHandler')
const {logger} = require('./middleware/logEvents');
const cors = require('cors')

//built-in middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
app.use('/subdir',express.static(path.join(__dirname,'public')))

app.use('/',require('./routers/root'))
app.use('/subdir', require('./routers/subdir'))

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


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')){
        res.json({"error": "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found");
    }
})

app.use(errorHandler)
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));
