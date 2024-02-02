const express = require('express')
const router = express.Router()
const passport = require('passport');
const passportConfig = require('./passport')
const JWT = require('jsonwebtoken')
const User = require('../models/users-model');


const signToken = userID => {
    return JWT.sign({
        iss: 'NoobCoder',
        sub: userID
    }, 'NoobCoder', { expiresIn: '1d' })
}
//first we are passing the payload and second the secret key we want to sign in
//must match we the key we given in passport
//sub is _id of the user


router.route('/get').get((req, res) => {
    User.find()
        .then(users => res.json({ users }))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/get/:id').post((req, res) => {
    const myuser = req.body;
    res.json({ myuser });
})

router.route('/get/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post(async (req, res) => {
    const { username, role, password } = req.body

    if (!username || !role || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ username })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    } 

    const newUser = new User({ username, role, password });
    // res.json(newUser);
    // console.log(newUser)rs
    
    newUser.save()
        .then(() => res.json({newUser}))
        .catch(err => res.status(400).json('Error: ' + err))


    // const user = await User.create({
    // username,
    // role,
    // password})
    
    // if(user){
    //     res.json({user});
    // }
    // else{
    //     res.status(400)
    //     throw new error("Invalid")
    // }
})

// router.route('/check').post(async (req, res) => {
//     try {
//         const userName = req.body.username;
//         const pass = req.body.password;

//         const correctuser = await User.find({}).findOne({username: userName}).findOne({password:pass});
//         // res.json({ getallusers });
//         if(!correctuser){
//             return res.json({success:false})
//         }
//         //my favourite part that I figured out learn a lot
//         // const userid = correctuser._id;
//         res.json({success:true,correctuser:correctuser});

//     } catch (error) {
//         res.status(500).json({ msg: error })
//         // console.log(error);
//     }
// })


//here we are using the passport and in that using the localStrategy function that we made
//if successful we get
//session is false we donnot want server to maintain the session

// {
//     "username":"Tim",
//     "role":"user",
//     "password":"tim"
// }/

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, role } = req.user;//using passport localStrategy we are getting User object
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true })
        //httponly : you can not touch the cookie on the client side using javascript to prevent cross-site scripting attack
        //sameSite: prevent same site foldery attack
        res.status(200).json({ isAuthenticated: true, user: { username, role } ,token })
    }
})

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success:true});
})
// router.get('/logout',(req, res) => {
//     res.clearCookie('access_token');
//     res.json({user:{username : "", role : ""},success:true});
// })

module.exports = router