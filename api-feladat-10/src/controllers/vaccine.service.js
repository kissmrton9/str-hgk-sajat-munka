const Vaccine = require('../models/vaccine.model');

exports.create = VaccineData => {
    const vaccine = new Vaccine(VaccineData);
    return vaccine.save();
};

exports.findAll = () => Vaccine.find();

exports.findNumberOfData = id => Vaccine.estimatedDocumentCount();

exports.findOne = id => Vaccine.findById(id)

exports.update = (id, updateData) => Vaccine.findByIdAndUpdate(id, updateData, {new: true});

exports.delete = id => Vaccine.findByIdAndDelete(id);