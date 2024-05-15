const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1 : Get all the Notes using: GET " /api/notes/fetchallnotes . Login Required"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });

  res.json(notes);
});

// Route 2 : Add a new Note : POST " /api/notes/addnotes . Login Required"
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors:
            "Sorry a user with this email aldready exists " && errors.array(),
        });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3 : Update an existing Notes using: PUT " /api/notes/updatenotes . Login Required"
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(401).send("Not Found");
    }

    // Allow updation only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).status("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4 : Delete an existing Notes using: DELETE " /api/notes/deletenotes . Login Required"
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Find the note to be deleted and delete it
  let note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(401).send("Not Found");
  }

  // Allow deletion only if user owns this note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).status("Not Allowed");
  }

  note = await Note.findByIdAndDelete(req.params.id);
  res.json({ Success: "Note has been Deleted", note: note });
});

module.exports = router;
