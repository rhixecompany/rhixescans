const axios = require("axios");
const cheerio = require("cheerio");
const asyncHandler = require("express-async-handler");
const Comic = require("../models/comicsModel");

const url = process.env.URL;

// @route GET /api/comics/
// @access Private
const getComics = asyncHandler(async (req, res) => {
  const comics = await Comic.find();
  if (!comics) {
    res.status(400);
    throw new Error("comics not found");
  }
  res.status(200).json(comics);
});

// @desc load Comics
// @route GET /api/comics/load
// @access Private
const loadComics = asyncHandler(async (req, res) => {
  const comics = await Comic.find();
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(".content-genres-item", html).each((i, el) => {
        const name = $(el).find(".genres-item-name").text();
        const image = $(el).find(".genres-item-img img").attr("src");
        const rates = $(el).find(".genres-item-rate").text();
        const views = $(el).find(".genres-item-view").text();
        const date = $(el).find(".genres-item-time").text();
        const author = $(el).find(".genres-item-author").text();
        const description = $(el).find(".genres-item-description").text();
        const comics = Comic.create({
          name,
          image,
          rates,
          views,
          date,
          author,
          description,
        });
      });
      res.status(200).json(comics);
    })
    .catch((err) => console.log(err));
});

// @desc Create Comic
// @route POST /api/comics/
// @access Private
const addComic = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add the comic name");
  }

  const comic = await Comic.create({
    name: req.body.name,
  });

  res.status(200).json(comic);
  console.log(comic);
});

// @desc Update Comic
// @route PUT /api/comics/:id
// @access Private
const updateComic = asyncHandler(async (req, res) => {
  const comic = await Comic.findById(req.params.id);
  if (!comic) {
    res.status(400);
    throw new Error("Comic not found");
  }

  const updatedComic = await Comic.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedComic);
});

// @desc Get Comic
// @route GET /api/comics/:id
// @access Private
const getComic = asyncHandler(async (req, res) => {
  const comic = await Comic.findById(req.params.id);
  if (!comic) {
    res.status(400);
    throw new Error("Comic not found");
  }
  res.status(200).json(comic);
});

// @desc Delete Comic
// @route DELETE /api/comics/:id
// @access Private
const deleteComic = asyncHandler(async (req, res) => {
  const comic = await Comic.findById(req.params.id);
  if (!comic) {
    res.status(400);
    throw new Error("Comic not found");
  }

  await comic.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getComics,
  loadComics,
  getComic,
  addComic,
  updateComic,
  deleteComic,
};
