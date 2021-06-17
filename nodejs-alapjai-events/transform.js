const logger = require('./logger');
const { createReadStream, createWriteStream } = require('fs');
//const { appendFile } = require('fs').promises;
const path = require('path');

const options={
    encoding: 'utf8',
    highWaterMark:1024
};

function transform(str,isSpace){
//      Ha szókarakter előtt nem szókarakter szerepel, akkor alakítsa nagybetűsre.
//      Probléma: kötőjeles szavak, elválasztott szavak 
    result = str.replace(/[^\wáÁéÉíÍóÓöÖőŐúÚüÜűŰ][\wáÁéÉíÍóÓöÖőŐúÚüÜűŰ]/g, x => x.toUpperCase());
//    Az első karaktert attól függően alakítjuk nagybetűsre, hogy szókezdő karakter-e
    return isSpace ? result.charAt(0).toUpperCase() + result.slice(1) : result;
};

//logger.success(transform('abcde abcde',true));

function copyAndTransform(file,transform){
    try{
//        A fájlnév végére a kiterjesztés elé illesztjük, hogy "Copy"
        const fileCopy = path.dirname(file) + path.sep + path.basename(file,path.extname(file)) + 'Copy' + path.extname(file);
//        logger.success(fileCopy + '\n');
//        A fileCopy fájlba írunk a file fájlból
        const ws = createWriteStream(fileCopy);
        const s = createReadStream(file, options);
//        Az első betű biztos, hogy szókezdő.
        let isSpace = true;
//        A data eseményt figyelve a readable stream flow állapotba kerül;
//        egyszerre egy chunk-nyi adatot dolgozunk fel.
        s.on('data', (chunk) => {
            logger.success('+');
//            A writeable.write metódus false-ot ad vissza, ha nem tud írni
//            ilyenkor pufferel, de jobb nem megvárni a túlcsordulást
            if(!ws.write(transform(chunk,isSpace), options)){
                s.pause();
//                Ha minden kiíródott, folytassuk az olvasást
                ws.on('drain',()=>{s.resume()})
            }
//            A következő puffer első betűje akkor szókezdő, ha előtte nem betű volt
//            pattern.test(str) returns true iff pattern is found in str
            isSpace = ! /[\wáÁéÉíÍóÓöÖőŐúÚüÜűŰ]/.test(chunk.charAt(chunk.length - 1));
        });

//        Így is meg lehetne oldani a fájlba írást;
//        az appendFile Promise-t ad vissza!
//        s.on('data', (chunk) => {
//            appendFile(fileCopy,chunk,options)
//            .then(
//                () => logger.success('+'),
//                err => {throw err}
//            );
//        });

//        Ha minden adatot kiolvastunk, és kiírni is sikerült, akkor siker
        s.on('end', () => {
            ws.end('',options.encoding,() => logger.success('\n'+ 'File transform successful.' + '\n'));
        });

//        Így is meg lehetne oldani a befejezést;
//        az appendFile Promise-t ad vissza!
//        s.on('end', () => {
//            appendFile(fileCopy,'',options)
//            .then(
//                () => logger.success('\n'+ 'File transform successful.' + '\n'),
//                err => {throw err}
//            );
//        })

    }
    catch(err){
        logger.error('\n' + err + '\n');
    };
}

copyAndTransform(`${__dirname}/proba.txt`,transform);
