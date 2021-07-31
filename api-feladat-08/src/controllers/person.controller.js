const express = require('express');
const personService = require('./person.service');
const vaccineService = require('./vaccine.service');
const createError = require('http-errors');

const controller = express.Router();

exports.findAll = (req,res) => {
    return personService.findAll()
    .then(people => {
        res.status(200);
        res.json(people);
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
};

exports.findNumberOfData = (req,res) => {
    return personService.findNumberOfData()
    .then(people => {
        res.status(200);
        res.json(people);
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
};

exports.findNumberOfVaccinated = (req,res) => {
    return personService.findNumberOfVaccinated()
    .then(people => {
        res.status(200);
        res.json(people);
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
};


exports.findIsVaccinated = (req,res,next) => {
    return personService.findOne(req.params.id)
    .then(person => {
        return person ? res.json(Boolean(person.vaccine.count)) : 
            next(new createError.BadRequest('No such person'));
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
};

exports.create = (req,res,next) => {
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
};

/* Test it with

fetch('http://localhost:3000/person',{
    method: 'POST',
    body: JSON.stringify({firstName: 'John',lastName: 'Doe', vaccine: 'jd@gmail.com'}),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(r => r.json() ).then(d => console.log(d) );

*/

exports.update = (req,res,next) => {
    personService.findOne(req.params.id)
    .then(person => {
        if(!person){
            next(new createError.BadRequest(`No such person ${req.params.id}`));
        }
        const update = person;
        if(!req.params.vaccineId){
            update["vaccine"] = null;
            personService.update(req.params.id, update)
            .then(updated => {
                return res.json(updated);
            })
            .catch( (err) => new createError.InternalServerError(err.message) );
        }
        else{
            vaccineService.findOne(req.params.vaccineId)
            .then(vaccine => {
                if(!vaccine){
                    next(new createError.BadRequest(`No such vaccine ${req.params.vaccineId}`));
                }
                else{
                    if(person["vaccine"] && person["vaccine"].count){
                        if(person["vaccine"]["vaccine"].toString() != vaccine._id.toString()){
                            vaccineService.findOne(person["vaccine"]["vaccine"])
                            .then( prevVac => {
                                console.log(`Warning: Previously used vaccine ${prevVac.name} has been overwritten to ${vaccine.name}`);
                            })
                            .catch( () => {
                                console.log(`Warning: Previously used vaccine ${person["vaccine"]["vaccine"]} has been overwritten to ${vaccine.name}`);
                            });
                        }
                        update["vaccine"]["vaccine"] = vaccine._id;
                        update["vaccine"].count++;
                    }
                    else{
                        update["vaccine"] = {
                            count: 1,
                            vaccine: vaccine._id
                        }
                    }
                }
                return update;
            })
            .then(update => {
                personService.update(req.params.id, update)
                .then(updated => {
                    return res.json(updated);
                })
                .catch( (err) => new createError.InternalServerError(err.message) );
            })
            .catch( (err) => new createError.InternalServerError(err.message) );
        }
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
};

exports.delete = (req,res) => {
    personService.deletePersonsWithSpecifiedVaccine(req.params.vaccine || null)
    .then(query => console.log('Item(s) deleted'))
    .catch( (err) => new createError.InternalServerError(err.message) );
};
