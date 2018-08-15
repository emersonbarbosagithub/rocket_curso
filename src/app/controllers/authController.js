const express = require('express');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const Aluno = require('../models/aluno');
const Curso = require('../models/curso');
const Turma = require('../models/turma');
const Instrutor = require('../models/instrutor');

const router = express.Router();


function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

//rota de registro de Alunos
router.post('/registerAluno', async (req, res)=>{
    const { email } = req.body;
    try {

        if (await Aluno.findOne({ email })) {
            return res.status(400).send({ error: 'Esse aluno já está cadastrado.' });
        }

        const aluno = await Aluno.create(req.body);

        return res.send({
            aluno,
            token: generateToken({ id: aluno.id })
        });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

//rota de registro de Cursos
router.post('/registerCurso', async (req, res)=>{
    const { title } = req.body;

    try {
        if (await Curso.findOne({ title })) {
            return res.status(400).send({ error: 'Esse curso já existe.' });
        }

        const curso = await Curso.create(req.body);

        return res.send({
            curso,
            token: generateToken({ id: curso.id })
        });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

//rota de registro de Instrutores
router.post('/registerInstrutor', async (req, res)=>{
    const { email } = req.body;

    try {

        if (await Instrutor.findOne({ email })) {
            return res.status(400).send({ error: 'Esse instrutor já está cadastrado.' });
        }

        const instrutor = await Instrutor.create(req.body);

        return res.send({
            instrutor,
            token: generateToken({ id: instrutor.id })
        });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

//rota de registro de Turmas
router.post('/registerTurma', async (req, res)=>{
    const { title } = req.body;
    
    try {
        if (await Turma.findOne({ title })) {
            return res.status(400).send({ error: 'Essa turma já existe.' });
        }

        const turma = await Turma.create(req.body);

        return res.send({
            turma,
            token: generateToken({ id: turma.id })
        });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

//

//rota de Search do Aluno
router.post('/searchAluno', async (req, res) => {
    const { name } = req.body;

    const aluno = await Aluno.findOne({ name });

    if (!aluno) {
        return res.status(400).send({ error: 'Aluno não encontrado.'});
    }

    const token = jwt.sign({ id: aluno.id }, authConfig.secret, {
        expiresIn: 86400,
    });

    res.send({ aluno, token: generateToken({ id: aluno.id }) });
});

//rota de Search do Curso
router.post('/searchCurso', async (req, res) => {
    const { title } = req.body;

    const curso = await Curso.findOne({ title });

    if (!curso) {
        return res.status(400).send({ error: 'Curso não encontrado.'});
    }

    const token = jwt.sign({ id: curso.id }, authConfig.secret, {
        expiresIn: 86400,
    });

    res.send({ curso, token: generateToken({ id: curso.id }) });
});

//rota de Search da Instrutor
router.post('/searchInstrutor', async (req, res) => {
    const { name } = req.body;

    const instrutor = await Instrutor.findOne({ name });

    if (!instrutor) {
        return res.status(400).send({ error: 'Instrutor não encontrada.'});
    }

    const token = jwt.sign({ id: instrutor.id }, authConfig.secret, {
        expiresIn: 86400,
    });

    res.send({ instrutor, token: generateToken({ id: instrutor.id }) });
});

//rota de Search da Turma
router.post('/searchTurma', async (req, res) => {
    const { title } = req.body;

    const turma = await Turma.findOne({ title });

    if (!turma) {
        return res.status(400).send({ error: 'Turma não encontrada.'});
    }

    const token = jwt.sign({ id: turma.id }, authConfig.secret, {
        expiresIn: 86400,
    });

    res.send({ turma, token: generateToken({ id: turma.id }) });
});


module.exports = app => app.use('/auth', router);