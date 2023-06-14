const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    userId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "in_progress", "completed"],
      default: "new",
    }

  },
  { timestamps: true }
);
module.exports = mongoose.model("Task", taskSchema);
