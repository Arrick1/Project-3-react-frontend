const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
    exercise: []
})

module.exports = mongoose.model('Exercise', ExerciseSchema)