const logger = require('./logger');
const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('stream');
const path = require('path');

const options={
    //encoding: 'utf8',
    highWaterMark:1024
};

// Osztály a transzformáláshoz
class TitleCaseStream extends Transform{
    constructor(){
        super();
        this.isSpace = true; // a buffer állapota: pontosan akkor true, ha az első karakter szókezdő
        this.encoding = 'utf8';
    }
    
    
    transform(str,isSpace){
    //      Ha szókarakter előtt nem szókarakter szerepel, akkor alakítsa nagybetűsre.
    //      Probléma: kötőjeles szavak, elválasztott szavak 
        let result = str.replace(/[^\wáÁéÉíÍóÓöÖőŐúÚüÜűŰ][\wáÁéÉíÍóÓöÖőŐúÚüÜűŰ]/g, x => x.toUpperCase());
    //    Az első karaktert attól függően alakítjuk nagybetűsre, hogy szókezdő karakter-e
        return isSpace ? result.charAt(0).toUpperCase() + result.slice(1) : result;
    }
        
    // Az _transform metódus végzi az átalakítást
    _transform(chunk, encoding, done){ // done is a callback, need not be defined, but must be called :(
        const chunkStr = chunk.toString(this.encoding); // chunk csak egy buffer, stringgé kell alakítani
                                                        // ha nem adunk meg kódolást, akkor is ugyanaz,
                                                        // pedig a readable stream-ből elvileg stringet olvasunk ki...
        this.push(this.transform(chunkStr,this.isSpace));
//      A következő puffer első betűje akkor szókezdő, ha előtte nem betű volt
//      pattern.test(str) returns true iff pattern is found in str
        this.isSpace = ! /[\wáÁéÉíÍóÓöÖőŐúÚüÜűŰ]/.test(chunkStr.charAt(chunkStr.length - 1));
        logger.success('+');
        done(); // must be called to finish
    }
    
}
const file =`${__dirname}/proba.txt`;

try{
//    A fájlnév végére a kiterjesztés elé illesztjük, hogy "Copy"
    const fileCopy = path.dirname(file) + path.sep + path.basename(file,path.extname(file)) + 'Copy' + path.extname(file);
//    logger.success(fileCopy + '\n');
//    A fileCopy fájlba írunk a file fájlból
    const ws = createWriteStream(fileCopy);
    const s = createReadStream(file, options);
                
    s // A readable s streamből kiolvassuk az adatot
        .pipe(new TitleCaseStream()) // átalakítjuk
        .pipe(ws); // beírjuk a writeable streambe
//  Ha minden adatot kiírtunk (a pipe automatikusan kibocsátja a 'finish' eseményt), akkor siker
    ws.on('finish', () => logger.success('\n'+ 'File transform successful.' + '\n'));
}
catch(err){
    logger.error('\n' + err + '\n');
    try{
        ws.end(); // próbáljuk meg bezárni a writeable-t, mert error esetén nyitva maradhat
    }
    catch(err){
        logger.error('\n' + err + '\n');
    }
};

