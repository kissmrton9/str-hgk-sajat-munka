const express = require('express');
const personService = require('./person.service');
const createError = require('http-errors');

const controller = express.Router();

exports.findAll = ('/', (req,res) => {
    return personService.findAll()
    .then(people => {
        res.status(200);
        res.json(people);
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
});

exports.findNumberOfData = ('/count',(req,res) => {
    return personService.findNumberOfData()
    .then(people => {
        res.status(200);
        res.json(people);
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
});

exports.findNumberOfVaccinated = ('/vaccinated',(req,res) => {
    return personService.findNumberOfVaccinated()
    .then(people => {
        res.status(200);
        res.json(people);
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
});


exports.findIsVaccinated = ('/:id/vaccinated',(req,res,next) => {
    return personService.findOne(req.params.id)
    .then(person => {
        return person ? res.json(Boolean(person.vaccine)) : 
            next(new createError.BadRequest('No such person'));
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
});

exports.create = ('/',express.json(),(req,res,next) => {
    if(!req.body || !req.body["firstName"] || !req.body["lastName"]){
        return next(new createError.BadRequest('Request body must contain person data'));
//        return res.status(400).send('BadRequestError: Request body must contain person data');
    }
    const newPerson = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        vaccine: req.body.vaccine || null,
    };
    return personService.create(newPerson) // newPerson.save() helyett
    .then(data => {
        res.status(201);
        res.json(data);
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
});

/* Test it with

fetch('http://localhost:3000/person',{
    method: 'POST',
    body: JSON.stringify({firstName: 'John',lastName: 'Doe', vaccine: 'jd@gmail.com'}),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(r => r.json() ).then(d => console.log(d) );

*/

exports.update = ('/:id/:vaccine?',(req,res,next) => {
    personService.findOne(req.params.id)
    .then(person => {
        if(!person){
            next(new createError.BadRequest('No such person'));
        }
        else{
            const update = person;
            update["vaccine"] = req.params.vaccine || null;
            personService.update(req.params.id, update, {new: false})
            .then(updated => {
                return res.json(updated);
            })
            .catch( (err) => new createError.InternalServerError(err.message) );
        }
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
});

// this variant requires async 
/*exports.update = ('/:id/:vaccine?',async (req,res,next) => {
    try{
        const person = await personService.findOne(req.params.id);
    }
    catch{
        (err) => new createError.InternalServerError(err.message);
    }
    if(person){
        const update = person;
        update["vaccine"] = req.params.vaccine || null;
        try{
            const updated = await personService.update(req.params.id, update, {new: false});
        }
        catch{
            (err) => new createError.InternalServerError(err.message);
        }
        return res.json(updated);
    }
    else return next(new createError.BadRequest('No such person'));
});
*/

exports.delete = ('/:vaccine',(req,res) => {
    personService.deletePersonsWithSpecifiedVaccine(req.params.vaccine)
    .then(query => console.log('Item(s) deleted'))
    .catch( (err) => new createError.InternalServerError(err.message) );
});
