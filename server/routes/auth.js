const express = require('express');
const router = express.Router();
const Users = require('../mongoModules/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "fgnhFDB4#%ff25#RFDV636(hmg4";

//Route 1 : Create a User using: POST "/api/auth/createuser". Check Require Auth
router.post('/createuser', [
     body('name', 'Enter a valid name').isLength({ min: 3 }),
     body('email', 'Enter a valid email').isEmail(),
     body('password', 'password must be atleast 5 character').isLength({ min: 5 })
],

     async (req, res) => {
          let success = false; 
          // If there are error then return Errors and bad request
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }

          // Check whether the user email exist already
          try {

               let user = await Users.findOne({ email: req.body.email })
               if (user) {
                    return res.status(400).json({ success, error: "Sorry ,A user with this email already exists" })
               }

               // Create a new User 
               const salt = await bcrypt.genSalt(10);
               const securePass = await bcrypt.hash(req.body.password, salt);

               user = await Users.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: securePass
               })
               // Sending JWT token as a response to user
               const data = {
                    user: {
                         id: user.id
                    }
               }
               const Authtoken = jwt.sign(data, JWT_SECRET);
               success = true;
               res.json({ success, Authtoken })
          }
          catch (error) {
               console.error(error.message);
               res.status(500).send(success, "Internal Server Error");
          }
     })

//Route 2 : Authenticate a User using: POST "/api/auth/login" . No Login Required

router.post('/login', [
     body('email', 'Enter a valid email').isEmail(),
     body('password', 'password cannot be blank').exists()
],
     async (req, res) => {
          // If there are error then return Errors and bad request
          let success = false;
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }

          const { email, password } = req.body;
          try {
               let user = await Users.findOne({ email });
               if (!user) {
                    return res.status(400).json({ errors: "Please enter your correct email or password " });
               }

               const passwordCompare = await bcrypt.compare(password, user.password);
               if (!passwordCompare) {
                    return res.status(400).json({ success, errors: "Please enter your correct email or password " });
               }

               // Sending JWT token as a response to user
               const data = {
                    user: {
                         id: user.id
                    }
               }
               const Authtoken = jwt.sign(data, JWT_SECRET);
               success = true;
               res.json({success, Authtoken })

          } catch (error) {
               console.error(error.message);
               res.status(500).send("Internal Server Error");
          }
     })

//Route 3 : Get loggedIn User details using : POST "/api/auth/getUser" . Login Required
router.post('/getUser',fetchUser,  async (req, res) => {
          
          try {
               userId = req.user.id;
               const user = await Users.findById(userId).select("-password")
               res.send(user);
          } catch (error) {
               console.error(error.message);
               res.status(500).send( "Internal Server Error");
          }
     })

module.exports = router;