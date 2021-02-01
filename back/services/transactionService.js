const { db } = require('../models/index.js');
const { logger } = require('../config/logger.js');

const Transaction = db.Transaction;

const create = async (req, res) => {
  try {
    const transaction = new Transaction({
      description: req.body.description,
      value: req.body.value,
      category: req.body.category,
      type: req.body.type,
      year: req.body.year,
      day: req.body.day,
      month: req.body.month,
      yearMonth: req.body.yearMonth,
      yearMonthDay: req.body.yearMonthDay
    });

    try {
      await transaction.save(transaction);
      res.send({ message: 'transacão inserida com sucesso' });
    } catch (error) {
      res.status(500).send({ message: error.message || 'Ocorreu erro ao salvar transaction' });
    }

    res.send();
    logger.info(`POST /Transaction - ${JSON.stringify(transaction)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ocorreu ao salvar' });
    logger.error(`POST /Transaction - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {

 async function sleep(ms)
{
    return(new Promise(function(resolve, reject) {        
        setTimeout(function() { resolve(); }, ms);        
    }));    
};

  var condition;
  if (req.query.period) {
    const period = req.query.period.replace(/"/g, '')
    condition = { yearMonth: period }
  }
  else
  {
    res.status(500)
    .send({ message: 'Necessário informar um período no formato yyyy-mm' });
    return;
  }


  try {
    const data = await Transaction.find(condition);

    if (data.length < 1) {
      res.status(404).send({ message: 'Nenhum transaction encontrado' });
    }
    else {
      res.send(data);
      logger.info(`GET /Transaction`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /Transaction - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {

  const id = req.params.id;

  try {

    const data = await Transaction.findById({ _id: id });

    if (data.length < 1) {
      res.status(404).send({ message: 'Nenhum registro encontrado com Id:' + id });
    } else
      res.send(data);
    logger.info(`GET /Transaction - ${id}`);

  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /Transaction - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await Transaction.findByIdAndUpdate({ _id: id }, req.body, {
      new: true
    });

    if (data.length < 1) {
      res.status(404).send({ message: 'Nenhum registro encontrado para atualização' });
    } else {
      res.send(data);
    }
    logger.info(`PUT /Transaction - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /Transaction - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {

    const data = await Transaction.findByIdAndDelete({ _id: id });

    if (data.length < 1) {
      res.status(404).send({ message: "Não foi possível realizar a exclusão. Dados não encontrados" })
    }
    else
      res.send({ message: 'Grade excluido com sucesso' });
    logger.info(`DELETE /Transaction - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /Transaction - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {

    const data = await Transaction.deleteMany();

    if (data.length < 1) {
      res.status(404).send({ message: "Não foi possível realizar a exclusão. Dados não encontrados" })
    }
    else
      res.send({
        message: `Grades excluidos`,
      });
    logger.info(`DELETE /Transaction`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /Transaction - ${JSON.stringify(error.message)}`);
  }
};

module.exports = { create, findAll, findOne, update, remove, removeAll };

