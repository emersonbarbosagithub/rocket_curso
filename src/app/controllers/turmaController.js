const express = require('express');

const Curso = require('../models/curso');
const Turma = require('../models/turma');

const router = express.Router();

//Rota de Listagem
router.get('/', async (req, res) =>{
    try{
        const turmas = await Turma.find();
        return res.send({ turmas });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar.' });
    }
});

//Rota de Listagem para um só
router.get('/:turmaId', async (req, res) =>{
    try{
        const turma = await Turma.findById(req.params.turmaId);
        return res.send({ turma });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar.' });
    }
});

//Rota para criar
router.post('/', async (req, res) =>{
    try{
        const { title, description, cursos } = req.body;

        if (await Turma.findOne({ title })) {
            return res.status(400).send({ error: 'Essa turma já está cadastrada.' });
        }

        const turma = await Turma.create({ title, description });
        
        await Promise.all(cursos.map(async curso => {
            const turmaCurso = await Curso.findById(curso._id);

            await turmaCurso.save();

            turma.cursos.push(turmaCurso);
        }));

        await turma.save();

        return res.send({ turma });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao criar.' });
    }
});

//Rota para atualizar
router.put('/:turmaId', async (req, res) =>{
    try{
        const { title, description, cursos } = req.body;

        const turma = await Turma.findByIdAndUpdate(req.params.turmaId, {
             title,
             description
        }, { new: true }); //Retorna a turma atualizada

        turma.cursos = [];
        await Curso.remove({turma: turma._id});
        
        await Promise.all(cursos.map(async curso => {
            const turmaCurso = new Curso({ ...curso })

            await turmaCurso.save();

            turma.cursos.push(turmaCurso);
        }));

        await turma.save();

        return res.send({ turma });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao atualizar.' });
    }
});

//Rota para deletar
router.delete('/:turmaId', async (req, res) =>{
    try{
        await Turma.findByIdAndRemove(req.params.turmaId);
        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar.' });
    }
});

module.exports = app => app.use('/turmas', router);