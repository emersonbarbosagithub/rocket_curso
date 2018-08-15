const mongoose = require('../../database');

const AlunoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    turmas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turma',
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

const Aluno = mongoose.model('aluno', AlunoSchema);

module.exports = Aluno;