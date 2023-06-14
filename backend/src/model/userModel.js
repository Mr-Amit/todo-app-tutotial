const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    }

},
    { timestamps: true }
);
module.exports = mongoose.model("Todo Users", userSchema);