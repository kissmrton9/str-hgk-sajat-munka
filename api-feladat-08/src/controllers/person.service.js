const Person = require('../models/person.model');

exports.create = personData => {
    const person = new Person(personData);
    return person.save();
};

exports.findAll = () => Person.find().populate('vaccine.vaccine');

exports.findNumberOfData = id => Person.estimatedDocumentCount();

exports.findNumberOfVaccinated = id => Person.countDocuments({vaccine: {$ne: null}});

exports.findOne = id => Person.findById(id);

exports.update = (id, updateData) => Person.findByIdAndUpdate(id, updateData, {new: true});

exports.deletePersonsWithSpecifiedVaccine = vaccineId => Person.deleteMany({"vaccine.vaccine": vaccineId});