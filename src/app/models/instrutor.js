const mongoose = require('../../database');

const InstrutorSchema = new mongoose.Schema({
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

const Instrutor = mongoose.model('instrutor', InstrutorSchema);

module.exports = Instrutor;