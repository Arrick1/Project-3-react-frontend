const express = require('express');
const router = express.Router();

const User = require('../models/User')

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json({user})
  } catch (err) {
    res.json({err})
  }
});

router.post('/',  async (req, res) => {
 try {
   const user = await User.create(req.body)
   res.json({user})
   console.log(user)
 } catch (err) {
   res.json({err})
   
 }
});

router.post('/login', async (req, res)=> {
  console.log('HIT')
  try {
    const foundUser = await User.findOne({username: req.body.username})
    console.log(foundUser)
    res.json({
      data:foundUser,
      success: true
    })
  } catch (err) {
    res.send(err)
  }
})

router.put('/', (req, res) => {
  return res.json({data: 'Received a GET HTTP method users'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a GET HTTP method users'});
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      res.redirect('/');
    }
  })
})

module.exports = router;

