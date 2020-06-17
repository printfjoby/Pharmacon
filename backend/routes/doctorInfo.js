const router = require('express').Router();
let Users = require('../models/users');

router.route('/').get((req, res) => {
  Users.find( {$and: [{"role":"doctor"},{"acc_status":true} ]}, {password:0, role:0,acc_status:0, date:0, __v:0 })
    .then(doctors => res.json(doctors))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Users.findById(req.params.id)
    .then( doctorInfo => res.json(doctorInfo.first_name + " " + doctorInfo.last_name)) 
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;