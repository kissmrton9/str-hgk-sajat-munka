const Person = require('../models/person.model');

exports.create = personData => {
    const person = new Person(personData);
    return person.save();
};

exports.findAll = () => Person.find().populate('vaccines');

exports.findNumberOfData = id => Person.estimatedDocumentCount();//.populate('vaccines');

exports.findNumberOfVaccinated = id => Person.countDocuments({vaccine: {$ne: null}});//.populate('vaccines');

exports.findOne = id => Person.findById(id);//.populate('vaccines');

exports.update = (id, updateData) => Person.findByIdAndUpdate(id, updateData, {new: true});

exports.deletePersonsWithSpecifiedVaccine = vaccineId => Person.deleteMany({"vaccine.vaccine": vaccineId});