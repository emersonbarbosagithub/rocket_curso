const express = require('express');

const Aluno = require('../models/aluno');
const Turma = require('../models/turma');

const router = express.Router();

//Rota de Listagem
router.get('/', async (req, res) =>{
    try{
        const alunos = await Aluno.find();
        return res.send({ alunos });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar.' });
    }
});

//Rota de Listagem para um só
router.get('/:alunoId', async (req, res) =>{
    try{
        const aluno = await Aluno.findById(req.params.alunoId);
        return res.send({ aluno });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar.' });
    }
});

//Rota para criar
router.post('/', async (req, res) =>{
    try{
        const { name, email, turmas } = req.body;

        if (await Aluno.findOne({ email })) {
            return res.status(400).send({ error: 'Esse aluno já está cadastrado.' });
        }

        const aluno = await Aluno.create({ name, email });
    
            //Resolver o curso
            //const curso = await Curso.create(req.body);
            //curso.save();
            //
            await Promise.all(await turmas.map(async turma => {
                const alunoTurma = await Turma.findById(turma._id);
    
                await alunoTurma.save();
    
                aluno.turmas.push(alunoTurma);
            }));

        await aluno.save();

        return res.send({ aluno });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao criar.' });
    }
});

//Rota para atualizar
router.put('/:alunoId', async (req, res) =>{
    res.send({ aluno });
});

//Rota para deletar
router.delete('/:alunoId', async (req, res) =>{
    try{
        await Aluno.findByIdAndRemove(req.params.alunoId);
        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar.' });
    }
});

module.exports = app => app.use('/alunos', router);