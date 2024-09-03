const Note = require("../models/noteModel");
const {
  handleAsync,
  handleResponse,
} = require("../utils/helper");

const createNote = handleAsync(async (req, res) => {
  const { title, content } = req.body;
  try {
      const newNote = new Note({
        title,
        content,
        user: req.user.id,
      });
      console.log( req.user.id);

      const note = await newNote.save();
      if(!note)  return res.status(400).json({
        success: false,
        msg: `Can't Create a Note`,
      });

      res.status(201).json(handleResponse({note},"Note successfully Created"))
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        msg: `Error in Creating Note`,
      });

    }
});

const getAllNotes = handleAsync(async (req, res) => {
  try {
    const limit = req.query.limit || 10; // retrieve the limit from query parameter or default to 10

    const notes = await Note
    .find({user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(limit);

    if (!notes) return res.status(404).json({
      success: false,
      msg: `No Notes are found`,
    });

    res.status(200).json(handleResponse({ notes }));

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      msg: `Error in reading Notes`,
    });

  }
 
});

const getNote = handleAsync(async (req, res) => {
  try {
    const id = req?.params?.id;
    if (!id) return res.status(400).json({
      success: false,
      msg: `Note ID required`,
    });

    const user = await Note.findOne({ 
      user: req.user.id });

    if (!user) return res.status(404).json({
      success: false,
      msg: `User ID with ${id} not found`,
    });
    
    const note = await Note.findOne({
      user: req.user.id,
      _id: id
    });

    if (!note) return  res.status(404).json({
      success: false,
      msg: `Note not found ||Restricted to user - ${req.user.id}`,
    });

    res.status(200).json(handleResponse({ note }));

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      msg: `Error in reading Specified Note`,
    });

  }
});

const deleteAllNotes = handleAsync(async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    if (!notes.length) {
      return res.status(404).json({
        success: false,
        msg: `No notes found`,
      });
    }

    const { deletedCount } = await Note.deleteMany({ user: req.user.id });

    if (!deletedCount) {
      return res.status(404).json({
        success: false,
        msg: `Notes deletion failed`,
      });
    }

    res.status(200).json(handleResponse({ deletedCount }, "All notes deleted successfully"));
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      msg: `Error in deleting notes`,
    });
  }
});


const deleteNote = handleAsync(async (req, res) => {

  try {
    const id = req?.params?.id;
    if (!id) return res.status(400).json({
      success: false,
      msg: `Note ID required`,
    });
    
    const note = await Note.findOne({ _id: id, user: req.user.id }).exec();
    if (!note) return res.status(404).json({
      success: false,
      msg: `Note ID with ${id} is not created by you`,
    });
     
    const result = await Note.deleteOne({ _id: id });
    if (!result) return res.status(404).json({
      success: false,
      msg: `Note deletion failed`,
    });
    
    res.status(200).json(handleResponse({ result }, "Note deleted successfully"));
 
   } catch (err) {
     console.error(err.message);
     return res.status(500).json({
      success: false,
      msg: `Error in deleting Specified Note`,
    });
    
   }

});

const updateNote = handleAsync(async (req, res) => {

  const { title, content } = req.body;
  try {
    const id = req?.params?.id;
    if (!id) return res.status(400).json({
      success: false,
      msg: `Note ID required`,
    });

    let note = await Note.findById(id);
    if (!note) return res.status(404).json({
      success: false,
      msg: `Note ID with ${id} not found`,
    });
     

    // Make sure user owns note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        msg: `Not authorized`,
      });
    }

    note.title = title;
    note.content = content;

    note = await note.save();
    res.status(200).json(handleResponse({ note }, "Note updated successfully"));
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      msg: `Error in Updating Specified Note`,
    });

  }

});


module.exports = {
  createNote, getAllNotes, getNote,  deleteAllNotes, deleteNote, updateNote
};
