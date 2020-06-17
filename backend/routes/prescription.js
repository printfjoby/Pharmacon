const router = require('express').Router();
let PrescriptionList = require('../models/prescriptionList');

router.route('/:id').get((req, res) => {
  PrescriptionList.findById(req.params.id)
    .then( prescription => res.json(prescription))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
  PrescriptionList.find()
    .then( prescription => res.json(prescription))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const doctorId = req.body.doctorId;
  const patientName = req.body.patientName;
  const patientAge = req.body.patientAge;
  const medicineList = req.body.medicineList;

  const newPrescription = new PrescriptionList({patientName, patientAge, doctorId, medicineList});

  newPrescription.save()
    .then(() => {
      res.send(newPrescription._id);
    })
    .catch(err => res.status(400).json('Error: ' + err ));
});

module.exports = router;