const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")

const User = require('../models/User')


// router.get('/login', async (req, res))


// This is the Register route
router.post('/register', async (req, res )=> {
  try {
    const createdUser = await User.create(req.body);
    req.session.userId = createdUser._id
    res.json({
      data: createdUser,
      success: true
    })   
  } catch (err) {
    res.json({err})   
  }
})

// This is the Login Route
router.post('/login', async (req, res)=> {
  console.log('HIT')
  try {
    const foundUser = await User.findOne({username: req.body.username})
    console.log(foundUser)
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.userId = foundUser._id;
      req.session.logged = true;
      res.json({
        data: foundUser,
        success: foundUser ? true : false
      });
    }else {
      res.json({message})
    }

  
  } catch (err) {
    res.json({err})
  }
})


// This is the Logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.json({err});
    } else {
      res.json({
        success: true,
        message: "logged out!"
      });
    }
  })
})



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

// router.post('/users/:id/exercise', async (req, res) => {
//   try {
//     const foundUser = await User.findOne({username: req.body.username})
    
//   } catch (err) {
//     res.json(err)
    
//   }
// })


router.post("/add", async(req,res)=>{
  try{
    const foundUser = await User.findById(req.session.userId)
    const workout = { 
    }
    foundUser.workouts.push(req.body)
    foundUser.save()
    res.json({
      user: foundUser,
      success: true,
      message: "workout has been added"
    })
  }catch(err){
    console.log(err)
  }
})

router.get('/profile', async (req, res) => {
  try{
    console.log(req.session.userId)
    const foundUser = await User.findById(req.session.userId)
    console.log(foundUser)
    res.json({
      workouts: foundUser.workouts
    })

  }catch (err){
    console.log(err)
  }
})
router.put('/', (req, res) => {
  return res.json({data: 'Received a GET HTTP method users'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a GET HTTP method users'});
});

module.exports = router;

