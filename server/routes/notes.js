const express = require('express');
const router = express.Router();
const Note = require('../mongoModules/Note');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');


//Route 1 : Get All the Note using : GET "/api/notes/fetchAllNote" . Login Required
router.get('/fetchAllNote', fetchUser, async (req, res) => {
    try {
        const note = await Note.find({user: req.user.id});
        res.json({ note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 2 : Add New  Note using : POST "/api/notes/addNote" . Login Required
router.post('/addNote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    try {
        
        const { title, description, tag } =  req.body;
        
        // If there are error then return Errors and bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        const note = await new Note({
            title, description , tag, user: req.user.id
        })

        const savedNote = note.save();
        success = true;
        res.json({success, savedNote});


    } catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Internal Server Error");
    }
})

//Route 3 : Update Existing Note using : PUT "/api/notes/updateNote/:id" . Login Required
router.put('/updateNote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    let success = false;
     try {

         // Create a newNote Object
         const newNote = {title:"", description:"",tag:""};
         if (title) { newNote.title = title };
         if (description) { newNote.description = description };
         if (tag) { newNote.tag = tag };

         // Find the note to be updated
         let note = await Note.findById(req.params.id);
         if (!note) { return res.status(404).send("Not Found") }  // if user with this id not found
         if (note.user.toString() !== req.user.id) {    // check if user have authorization 
             return res.status(401).send(success, "Not Allowed");
         }
        
         note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
         success = true;
         res.json({success, note });
     } catch (error) {
         console.error(error.message);
         res.status(500).send(success, "Internal Server Error");
     }
})

//Route 4 : Deleting an Existing Note using : DELETE "/api/notes/deleteNote/:id" . Login Required
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    let success = false;
    try {
        // Find the note to be Deleted
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send(success, "Not Found") }  // if user with this id not found

        // check if user have authorization or allow deletion if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send(success, "Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        let success = true;
        res.json({ success , note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Internal Server Error");
    }
}) 

module.exports = router