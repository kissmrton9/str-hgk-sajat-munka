const express = require('express');
const vaccineService = require('./vaccine.service');
const createError = require('http-errors');

const controller = express.Router();

exports.findAll = ('/', (req,res) => {
    return vaccineService.findAll()
    .then(people => {
        res.status(200);
        res.json(people);
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
});

exports.findNumberOfData = ('/count',(req,res) => {
    return vaccineService.findNumberOfData()
    .then(people => {
        res.status(200);
        res.json(people);
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
});

exports.create = ('/',express.json(),(req,res,next) => {
    if(!req.body || !req.body["name"] || !req.body["efficiency"]){
        return next(new createError.BadRequest('Request body must contain vaccine data'));
//        return res.status(400).send('BadRequestError: Request body must contain vaccine data');
    }
    const newVaccine = {
        name: req.body.name,
        efficiency: req.body.efficiency
    };
    return vaccineService.create(newVaccine) // newVaccine.save() helyett
    .then(data => {
        res.status(201);
        res.json(data);
    })
    .catch( (err) => new createError.InternalServerError(err.message) );
});

/* Test it with

fetch('http://localhost:3000/vaccine',{
    method: 'POST',
    body: JSON.stringify({name: 'Sinopharm', efficiency: 79}),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(r => r.json() ).then(d => console.log(d) );

*/

exports.update = ('/',(req,res,next) => {
    // is this necessary?
});

exports.delete = ('/:id',(req,res) => {
    vaccineService.delete(req.params.id)
    .then(query => console.log('Item(s) deleted'))
    .catch( (err) => new createError.InternalServerError(err.message) );
});
