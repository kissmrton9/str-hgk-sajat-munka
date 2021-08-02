const express = require('express');
const controller = require('./person.controller');
//authentication
const adminOnly = require('../auth/adminOnly');

const router = express.Router();

// get all data
router.get('/',(req,res) => {
    return controller.findAll(req,res);
});

// get number of data
router.get('/count',(req,res) => {
    return controller.findNumberOfData(req,res);
});

// get number of vaccinated
router.get('/vaccinated',(req,res) => {
    return controller.findNumberOfVaccinated(req,res);
});

// query if specified person is vaccinated
router.get('/:id/vaccinated',(req,res,next) => {
    return controller.findIsVaccinated(req,res,next);
});

// create
router.post('/', adminOnly, (req,res,next) => {
    return controller.create(req,res,next);
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

// update
router.put('/:id/:vaccineId?', adminOnly, (req,res,next) => {
    return controller.update(req,res,next);   
});

router.delete('/:vaccine?', adminOnly, (req,res) => {
    return controller.delete(req,res);
});

module.exports = router;