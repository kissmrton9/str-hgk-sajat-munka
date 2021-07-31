const express = require('express');
const controller = require('./vaccine.controller');

const router = express.Router();

// get all data
router.get('/',(req,res) => {
    return controller.findAll(req,res);
});

// get number of data
router.get('/count',(req,res) => {
    return controller.findNumberOfData(req,res);
});

// create
router.post('/',express.json(),(req,res,next) => {
    return controller.create(req,res,next);
});

/* Test it with

fetch('http://localhost:3000/vaccine',{
    method: 'POST',
    body: JSON.stringify({name: 'PerfectVaccine', efficiency: 100}),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(r => r.json() ).then(d => console.log(d) );

*/

// update
router.put('/:id',(req,res,next) => {
    return controller.update(req,res,next);   
});

// delete
router.delete('/:id',(req,res) => {
    return controller.delete(req,res);
});

module.exports = router;