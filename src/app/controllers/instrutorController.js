const express = require('express');

const Instrutor = require('../models/instrutor');
const Curso = require('../models/curso');

const router = express.Router();

//Rota de Listagem
router.get('/', async (req, res) =>{
    try{
        const instrutores = await Instrutor.find();
        return res.send({ instrutores });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar.' });
    }
});

//Rota de Listagem para um só
router.get('/:instrutorId', async (req, res) =>{
    try{
        const instrutor = await Instrutor.findById(req.params.instrutorId);
        return res.send({ instrutor });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar.' });
    }
});

//Rota para criar
router.post('/', async (req, res) =>{
    try{
        const { name, email, cursos } = req.body;

        if (await Instrutor.findOne({ email })) {
            return res.status(400).send({ error: 'Esse instrutor já está cadastrado.' });
        }

        const instrutor = await Instrutor.create({ name, email });
        
        await Promise.all(cursos.map(async curso => {
            const instrutorCurso = await Curso.findById(curso._id);

            await instrutorCurso.save();

            instrutor.cursos.push(instrutorCurso);
        }));

        await instrutor.save();

        return res.send({ instrutor });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao criar.' });
    }
});

//Rota para atualizar
router.put('/:instrutorId', async (req, res) =>{
    try{
        const { name, email, cursos } = req.body;

        const instrutor = await Instrutor.findByIdAndUpdate(req.params.instrutorId, {
             name,
             email
        }, { new: true }); //Retorna a instrutor atualizada

        instrutor.cursos = [];
        await Curso.remove({instrutor: instrutor._id});
        
        await Promise.all(cursos.map(async curso => {
            const instrutorCurso = new Curso({ ...curso })

            await instrutorCurso.save();

            instrutor.cursos.push(instrutorCurso);
        }));

        await instrutor.save();

        return res.send({ instrutor });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao atualizar.' });
    }
});

//Rota para deletar
router.delete('/:instrutorId', async (req, res) =>{
    try{
        await Instrutor.findByIdAndRemove(req.params.instrutorId);
        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar.' });
    }
});

module.exports = app => app.use('/instrutores', router);