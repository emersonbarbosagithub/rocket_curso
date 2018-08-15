const mongoose = require('../../database');

const CursoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    completed:{
        type: Boolean,
        require: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Curso = mongoose.model('curso', CursoSchema);

module.exports = Curso;