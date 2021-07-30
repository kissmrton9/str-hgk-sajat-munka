const express = require('express');
const data = require('../data/data');
const createError = require('http-errors');

const controller = express.Router();

//console.log(data);
controller.get('/',(req,res) => {res.json(data);});
controller.get('/count',(req,res) => {res.json(data.length);});
controller.get('/vaccinated',(req,res) => {res.json(data.filter(item => item.vaccine !== null).length);});

controller.get('/:id/vaccinated',(req,res,next) => {
    const person = data.find(item => item.id == req.params.id);
    if(person){
        res.json(Boolean(person.vaccine));
    }
//    else return next(new createError.BadRequest('No such person'));
//
// this exploits too much like
//
//BadRequestError: No such person
//    at controller.get (.../api-feladat-02/src/controllers/routes.js:17:22)
//    at Layer.handle [as handle_request] (.../api-feladat-02/node_modules/express/lib/router/layer.js:95:5)
//    at next (.../api-feladat-02/node_modules/express/lib/router/route.js:137:13)
//    at Route.dispatch (.../api-feladat-02/node_modules/express/lib/router/route.js:112:3)
//    at Layer.handle [as handle_request] (.../api-feladat-02/node_modules/express/lib/router/layer.js:95:5)
//    at .../api-feladat-02/node_modules/express/lib/router/index.js:281:22
//    at param (.../api-feladat-02/node_modules/express/lib/router/index.js:354:14)
//    at param (.../api-feladat-02/node_modules/express/lib/router/index.js:365:14)
//    at Function.process_params (.../api-feladat-02/node_modules/express/lib/router/index.js:410:3)
//    at next (.../api-feladat-02/node_modules/express/lib/router/index.js:275:10)
    else return res.status(400).send('BadRequestError: No such person');
});

controller.post('/',express.json(),(req,res,next) => {
    if(!req.body || !req.body["firstName"] || !req.body["lastName"]){
//        return next(new createError.BadRequest('Request body must contain person data'));
        return res.status(400).send('BadRequestError: Request body must contain person data');
    }
    const newPerson = req.body;
    newPerson.id = Math.max(...data.map(item => item.id)) + 1;
    data.push(newPerson);
    res.status(201);
    res.json(data);
});

/* Test it with

fetch('http://localhost:3000/person',{
    method: 'POST',
    body: JSON.stringify({firstName: 'John',lastName: 'Doe', email: 'jd@gmail.com'}),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(r => r.json() ).then(d => console.log(d) );

*/

controller.put('/:id/:vaccine?',(req,res) => {
    const id = req.params.id;
    const index = data.findIndex(p => p.id == id);
/*    data[index] = {
        "id": id,
        "firstName": req.body("firstName"),
        "lastName": req.body("lastName"),
        "vaccine": req.params.vaccine
    };*/
    if(index >= 0){
        data[index]["vaccine"] = req.params.vaccine || null;
        res.json(data[index]);
    }
    else return res.status(400).send('BadRequestError: No such person'); 
});

controller.delete('/:vaccine',(req,res) => {
    //data = data.filter(item => item.vaccine !== req.params.vaccine);
    // fails if data is declared as const
    //let n = data.length
    for(i=0;i<data.length;i++){
        if(data[i].vaccine === req.params.vaccine){
            data.splice(i,1);
        }
    }
    res.json(data);
});

module.exports = controller;