const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Users = require('../models/users')

process.env.SECRET_KEY = 'secret'

router.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    acc_status: false,
    created: today
  }

  Users.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          Users.create(userData)
            .then(user => {
              res.send('Successfully Registered!' )
            })
            .catch(err => {
              res.send('Failed To Register')
            })
        })
      } else {
        res.send('User already exists')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

router.post('/login', (req, res) => {
  Users.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          if(user.acc_status === true ){
            // Passwords match
            const payload = {
              _id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              role: user.role
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.send(token)
          }else {
            // Inactive Account
            res.send({msg: 'Account not Activeted'})
          }
        } else {
          // Passwords don't match
          res.send({msg: 'Invalid email or password'})
        }
      } else {
        res.send({msg: 'Invalid email or password'})
      }
    })
    .catch(err => {
      res.send({msg: 'Failed to access database'})
    })
})

//Returns inactive accounts
router.route('/inactive').get((req, res) => {
  Users.find( {"acc_status":false}, {password:0, acc_status:0, date:0, __v:0 })
    .then(usrs => res.json(usrs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/approve', (req, res) => {
  Users.updateOne({_id:req.body._id},{$set:{'acc_status':req.body.acc_status}})
    .then(() => res.json('Updated'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(() => res.json('Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router
