const Note = require("../models/note");

const get_all_notes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ content: notes });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const add_note = async (req, res) => {
  try {
    const note = await Note.create({ ...req.body, user: req.user._id });
    res.json({ msg: "Note saved", content: note });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const get_one_note = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.json({ content: note });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const update_note = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.json({ msg: "Note updated", content: note });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const delete_note = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.json({ msg: "Note deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  get_all_notes,
  add_note,
  get_one_note,
  update_note,
  delete_note,
};