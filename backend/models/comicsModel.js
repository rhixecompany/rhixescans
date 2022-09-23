const mongoose = require("mongoose");

const comicSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the Comics Name"],
    },
    image: {
      type: String,
    },
    rates: {
      type: String,
    },
    views: {
      type: String,
    },
    date: {
      type: String,
    },
    author: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comic", comicSchema);
