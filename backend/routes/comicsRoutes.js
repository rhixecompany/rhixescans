const express = require("express");
const router = express.Router();
const {
  getComics,
  loadComics,
  getComic,
  addComic,
  updateComic,
  deleteComic,
} = require("../controllers/comicsController");

const { protect } = require("../middleware/authMiddleware");

router.route("/load").get(loadComics);

router.route("/").get(getComics).post(protect, addComic);
router
  .route("/:id")
  .get(getComic)
  .put(protect, updateComic)
  .delete(protect, deleteComic);

module.exports = router;
