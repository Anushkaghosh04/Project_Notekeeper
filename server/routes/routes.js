const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const messageController = require("../controllers/messageController");
const requireAuth = require("../middleware/authMiddleware");

// Feedback Route
router.post("/submitFeedback", messageController.submit_feedback);

// Authenticated Note Routes
router.use(requireAuth); //  protect below routes

router.get("/allNotes", noteController.get_all_notes);
router.post("/addNote", noteController.add_note);
router.get("/noteDetails/:id", noteController.get_one_note);
router.patch("/updateNote/:id", noteController.update_note);
router.delete("/deleteNote/:id", noteController.delete_note);

module.exports = router;