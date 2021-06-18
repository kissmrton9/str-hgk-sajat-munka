const path = require('path');
const { copyFile, unlink } = require('fs').promises;
// From v14.14.0 we can use rm instead of unlink
//const { copyFile, rm } = require('fs').promises;
const { createReadStream, createWriteStream } = require('fs');
const { createGzip } = require('zlib');

const options={
    encoding: 'utf8',
    highWaterMark:1024
};

async function myGzip(file){
    try{
    //        A fájlkiterjesztés után illesztjük, hogy ".bak"
            const fileBak = path.dirname(file) + path.sep + path.basename(file) + '.bak';
    //        console.log(fileBak);
    //        A file fájlt másoljuk, promise-t kapunk vissza
            await copyFile(file, fileBak);
            const ws_to_gz = createWriteStream(path.dirname(file) + path.sep + path.basename(file) + '.gz');
            const s = createReadStream(fileBak, options);
            s
            .pipe(createGzip())
            .pipe(ws_to_gz)
    //        Ha minden adatot kiolvastunk, és kiírni is sikerült, akkor töröljük az eredetit és a .bak file-t is:
            s.on('end', () => {
// Using the readable.pipe() method, when the source Readable stream emits 'end',
// stream.end() is called on the destination Writable stream by default.
// This emits 'finish' on  the destination Writable stream. 
                ws_to_gz.on('finish',() => {unlink(file);unlink(fileBak)});
            });

    }
    catch(err){
        console.log(err);
        try{
            ws_to_gz.end();
        }
        catch(err){
            console.log(err);
        }
    }
};

myGzip(`${__dirname}/proba.txt`);