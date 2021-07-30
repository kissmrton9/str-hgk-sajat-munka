const express = require('express');
const data = require('../data/data');

const controller = express.Router();

//console.log(data);
controller.get('/',(req,res) => {res.json(data);});
controller.get('/count',(req,res) => {res.json(data.length);});
controller.get('/vaccinated',(req,res) => {res.json(data.filter(item => item.vaccine !== null).length);});

module.exports = controller;