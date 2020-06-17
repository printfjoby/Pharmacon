const router = require('express').Router();
let Users = require('../models/users');

router.route('/').get((req, res) => {
  Users.find( {$and: [{"role":"pharmasist"},{"acc_status":true} ]}, {password:0, role:0,acc_status:0, date:0, __v:0 })
    .then(pharmasists => res.json(pharmasists))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;