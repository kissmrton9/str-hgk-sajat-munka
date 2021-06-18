const { appendFile, mkdir } = require('fs').promises;
const path = require('path');

const basePath = __dirname + path.sep + 'createInsideHere';

// required directories and files to create
const dirArr = ['controllers','routers','views'];
const fileArr = ['controllers/site.controller.js','routers/site.router.js','views/index.html','views/app.js'];

function makeDirs(dirArr,basePath){
    for(const dir of dirArr){
//        az mkdir Promise-t ad vissza!
        mkdir(path.join(basePath,dir),0o700) // option: chmod 700 (given in octal)
        .then(
            () => console.log('%s\x1b[32m%s\x1b[0m%s', 'DIR: \'', dir, '\' is created'),
            err => console.log('\x1b[31m%s\x1b[0m', err.message)
        );
    }
}

function createFiles(fileArr,basePath){
    for(const file of fileArr){
//        az appendFile Promise-t ad vissza!
        appendFile(path.join(basePath,file),'') // if file doesn't exist this will create with default permissions
        .then(
            () => console.log('%s\x1b[32m%s\x1b[0m%s', 'FILE: \'', file, '\' is created or not modified'),
            err => console.log('\x1b[31m%s\x1b[0m', err.message)
        );
    }
}

mkdir(basePath,0o700)
    .then(
        () => {},
        (err) => console.log('\x1b[31m%s\x1b[0m', err.message)
    ) // if basePath already exists, only the error branch will be executed.
    .then(
        () => makeDirs(dirArr,basePath),
        (err) => console.log('\x1b[31m%s\x1b[0m', err.message)
    )
    .then(
        () => createFiles(fileArr,basePath),
        (err) => console.log('\x1b[31m%s\x1b[0m', err.message)
    );
