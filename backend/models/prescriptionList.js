const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const prescriptionListSchema = new Schema({
    patientName: { type: String, required: true},
    patientAge: { type: Number, required: true},
    doctorId: { type: Schema.Types.ObjectId, required: true},
    medicineList: [{
        medicineName: { type: String, required: true},
        dosage: { type: String, required: true},
    }],
});

const PrescriptionList = mongoose.model('PrescriptionList', prescriptionListSchema);

module.exports = PrescriptionList;