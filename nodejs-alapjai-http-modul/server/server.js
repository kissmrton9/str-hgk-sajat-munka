const http = require('http');
const { createReadStream } = require('fs');
const port = 8080; //also possible: const port = process.env.PORT || 8080
//const file = 'nodejs-alapjai-http-modul/views/index.html';
const { join } = require('path')
const SiteRouter = require(join(__dirname, '/../router/site.router'));

const date = function(){
    const options = { // here we enumerate what we need from a Date object
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
                //weekday: 'long', //we don't need it
                };
    return new Date().toLocaleString('hu-HU', options);
}
function log(req){ // új függvényt kellett írni
    console.log(`Date: ${date()} Url: ${req.url} Method: ${req.method}`);
}

// A simple version, needs to specify 'file'
//
//http.createServer((req, res) => {
//    res.writeHead(200, {
//        'Content-type': 'text/html'
//    });
//    console.log(`Date: ${date()} Url: ${req.url} Method: ${req.method}`);
//    createReadStream(file).pipe(res);
//}).listen(port);


http.createServer((req, res) => {
    log(req);
    SiteRouter[req.url]
        ? SiteRouter[req.url](res)
        : SiteRouter['/404'](res)
})
    .on('error', err => console.log(`Server error: ${err.message}`))
    .on('listening', () => console.log(`Run: http://127.0.0.1:${port}`))
    .listen(port)