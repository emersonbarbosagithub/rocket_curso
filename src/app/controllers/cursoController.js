const express = require('express');

const Curso = require('../models/curso');

const router = express.Router();

//Rota de Listagem
router.get('/', async (req, res) =>{
    try{
        const cursos = await Curso.find();
        return res.send({ cursos });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar.' });
    }
});

//Rota de Listagem para um só
router.get('/:cursoId', async (req, res) =>{
    try{
        const curso = await Curso.findById(req.params.cursoId);
        return res.send({ curso });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar.' });
    }
});

//Rota para criar
router.post('/', async (req, res) => {
    const { title } = req.body;

    try {
        if (await Curso.findOne({ title })) {
            return res.status(400).send({ error: 'Esse curso já existe.' });
        }

        const curso = await Curso.create(req.body);
        curso.save();

        return res.send({ curso });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

//Rota para atualizar
router.put('/:cursoId', async (req, res) =>{
    const { title } = req.body;

    try {

        const curso = await Curso.findByIdAndUpdate(req.params.cursoId, { title }, { new: true }); //Retorna o curso atualizada

        await curso.save();

        return res.send({ curso });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

//Rota para deletar
router.delete('/:cursoId', async (req, res) =>{
    try{
        await Curso.findByIdAndRemove(req.params.cursoId);
        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar.' });
    }
});

module.exports = app => app.use('/cursos', router);