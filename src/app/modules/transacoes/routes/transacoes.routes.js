const transacoesController = require('../controllers/transacoes.controller');

module.exports = (app) => {

  app.get(
    `/api/v1/transacoes/extrato/:idConta`,
    transacoesController.extrato
  );

  app.post(
    `/api/v1/transacoes/extrato-periodo/:idConta`,
    transacoesController.extratoPeriodo
  );

}