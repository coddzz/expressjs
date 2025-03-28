const {format} = require('date-fns')
const {v4:uuid} = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logName) => {
    const datetime = `${format(new Date(), 'dd-MM-yyyy\tHH:mm:ss')}`
    const logItem = `${datetime} \t ${uuid()} \t ${message}\n`
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs', logName ),logItem)
    } catch (err){
        console.log(err)
    }
}
const logger = (req, res, next) =>{
    logEvents(`${req.method} \t ${req.header.origin} \t ${req.url}`, 'logFile.txt')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = {logger, logEvents} ;