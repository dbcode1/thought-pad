const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const secret = config.get("JWT_SECRET")
const auth = require('../auth/auth');
const User = require("../models/User.js");
const Card = require("../models/Card.js")
const { Console } = require("console");


// register

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  
  let user = await User.findOne({ email });
  console.log(user)
  if(user) {
    //console.log("user exists")
    return res.status(400).send('User already exists');
  }

  user = new User({
    name,
    email,
    password: hash
  });
  console.log("user created", user)
  await user.save();
  
  const payload = {
    user: {
      id: user.id,
    },
  };
  jwt.sign(
    payload,
    config.get("JWT_SECRET"),
    { expiresIn: "2 days" },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
});

// login user
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
    let user = await User.findOne({ email });
    console.log(user)
		if(!user) {
      
			return res.status(400).send('No user with that name');
    }
		const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
			console.log('no password match');
			return res.status(400).send('Invalid Credentials');
		}
   
		const payload = {
			user: {
				id: user.id,
			},
		};

    const id = user.id
    
		jwt.sign(
			payload,
			config.get('JWT_SECRET'),
			{ expiresIn: 360000 },
			(err, token) => {
        
				if (err) throw err;
        console.log("token issued", token)
        res.json({ token, id});
				
			}
		);
	} catch (err) {
		console.error(err.message, "status", 400);
	}

 });

// Logout

router.post('/logout', async (req, res) => {
	req.user = ""
	req.header('x-auth-token') = null
	res.json('User logged out')
  return res.send('Sorry to see you go... come back sometime.');

  
})

// Delete User

// look up user .. user is in token,header?
// delete user... does this auto delete entries from
// redirect to landing
router.delete("/entries", auth, async (req, res) => {
  console.log("deleteUser", user, req.user.id)
  const user = User.findOneAndDelete("id", req.user.id)
  
  req.user = ""
  req.header('x-auth-token') = null
  return res.send('Sorry to see you go... come back sometime.');

})

//add thought 
router.post("/entries",  auth, async(req, res)=> {
  try {
    const {thought} = req.body

    let card = new Card({
      text: thought,
      user: req.user.id
    })
    res.json({"message": "Card Added", status: 200})
    await card.save()

  } catch (err) {
   console.log(err.response.data)  }
})

// get thoughts
router.post("/entries/user", auth,  async (req, res) => {
  // user _id
  console.log("add entry", req.body)
  const user = req.user
  const entries = await Card.find({ user: req.user.id}) 
  
  try {
    return res.send(entries);
  }catch (error) {
    res.status(500).json(error);
  }
})

// delete thought
router.delete('/delete', auth, async (req, res) => {
  try {
    console.log("resid", req.body.id)
    let card = await Card.deleteOne({_id : req.body.id})

    const user = req.user
    const entries = await Card.find({ user: req.user.id})
    const data = { 
      id: req.body.id,
      entries: entries
    }
    res.send(data)
    //res.send(req.body.id)
  }catch (error) {
    res.status(500).json({"message": "Didnt delete"});
  }
})



module.exports = router;
