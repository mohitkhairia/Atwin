const mongoose = require('mongoose');

const AthleteSchema = new mongoose.Schema({
    userId: Number,
    id: Number,
    Athlete: String,
    Score:{

        Score1: Number,
        Score2: Number,
        Score3: Number,
    },
    completed: Boolean
})

const Athlete = mongoose.model('Athlete', AthleteSchema);

module.exports = Athlete;