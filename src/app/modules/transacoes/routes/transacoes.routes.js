const transacoesController = require('../controllers/transacoes.controller');
const { body } = require('express-validator');
const appMiddleware = require('../../../middlewares/app.middleware');
const validarData = require('../../../helpers/data.helper');

const validatorExtratoPeriodo = [
  body('dataInicial', 'Data inicial é requerida').exists(),
  body('dataInicial', 'Data inicial inválida, utilize o formato yyyy-mm-dd').custom(validarData),
  body('dataFinal', 'Data final é requerida').exists(),
  body('dataFinal', 'Data final inválida, utilize o formato yyyy-mm-dd').custom(validarData)
];

module.exports = (app) => {

  app.get(
    `/api/v1/transacoes/extrato/:idConta`,
    appMiddleware.verificaConta,
    transacoesController.extrato,
  );

  app.post(
    `/api/v1/transacoes/extrato-periodo/:idConta`,
    validatorExtratoPeriodo,
    appMiddleware.validatorMiddleware,
    appMiddleware.verificaConta,
    transacoesController.extratoPeriodo
  );

}