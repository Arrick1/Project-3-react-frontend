const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")

const User = require('../models/User')

const logUser = (req, res, next) => {
  if(req.session.logged) {
      next()
  } else {
      res.redirect("/auth/login");
  }
}


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


// This is the users routes with workouts
router.get('/profile', async (req, res) => {
  try{
    console.log(req.session.userId)
    console.log('getting user')
    const foundUser = await User.findById(req.session.userId)
    console.log(foundUser)
    res.json({
      workouts: foundUser.workouts
    })

  }catch (err){
    console.log(err)
  }
})

// This is the show route
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json({
      user,
      currentUser: req.session.userId,
      logged: req.session.logged
    })
  } catch (err) {
    res.json({err})
  }
});

// This is the Edit Route
router.get('/:id/edit', logUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json({
      user,
      currentUser: req.session.userId,
      logged: req.session.logged
    })
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

router.put('/update/:id', async (req, res) => {
  const userId = req.session.userId || req.params.id
  try {
    const user =  await User.findById(userId)
    if(!req.body.password) {
      delete req.body.password
    } else {
      req.body.password = user.hashPassword(req.body.password);
      console.log(req.body.password, "<-- req.body.password after hashed");
    } 
    const updateUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true
    });
    console.log(req.body, "<-- req.body");
    console.log(updateUser, "<-- updatedUser");
    res.json({ updateUser });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a GET HTTP method users'});
});

module.exports = router;

