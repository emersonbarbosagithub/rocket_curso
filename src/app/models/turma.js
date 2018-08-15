const mongoose = require('../../database');

const TurmaSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
    },
    description: {
        type: String,
        require: true,
    },
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
    }],
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

const Turma = mongoose.model('turma', TurmaSchema);

module.exports = Turma;