const {format} = require('date-fns')
const {v4:uuid} = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

console.log(`${format(new Date(), 'dd-MM-yyyy\tHH:mm:ss')}`)

console.log(uuid())

const logEvents = async (message) => {
    const datetime = `${format(new Date(), 'dd-MM-yyyy\tHH:mm:ss')}`
    const logItem = `${datetime} \t ${uuid()} \t ${message}\n`
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await fsPromises.mkdir(path.join(__dirname,'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'logs','logFile.txt'),logItem)
    } catch (err){
        console.log(err)
    }
}

logEvents()
    