const { EventEmitter } = require('events');
const { format }= require('util');
class Logger extends EventEmitter {
    constructor (){
        super();
    }
    error(str){
//          In browser you can use css after %c:
//          console.log(`%c${str}`,'background:#AAAAAA;color:red')
//          console.log('\x1b[31m%s\x1b[0m',str);
//      the same without \n at the end:
        process.stdout.write(format('\x1b[31m%s\x1b[0m',str));
        };
    success(str){
//          console.log('\x1b[32m%s\x1b[0m',str);
//          In browser you can use css after %c:
//          console.log(`%c${str}`,'background:#AAAAAA;color:green')
//      the same without \n at the end:
        process.stdout.write(format('\x1b[32m%s\x1b[0m',str));
    };
};

module.exports = new Logger();