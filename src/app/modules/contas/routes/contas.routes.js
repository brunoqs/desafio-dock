const contasController = require('../controllers/contas.controller');
const contasMiddleware = require('../middlewares/contas.middleware');
const { body } = require('express-validator');
const validarCpf = require('../helpers/cpf.helper');
const validarData = require('../helpers/data.helper');

const validatorCriar = [ 
  body('nome', 'Nome é requerido').exists(), 
  body('cpf', 'Cpf é requerido').exists(),
  body('cpf', 'Cpf inválido').custom(validarCpf),
  body('dataNascimento', 'Data de nascimento é requerida').exists(),
  body('dataNascimento', 'Data de nascimento inválida, utilize o formato yyyy-mm-dd').custom(validarData)
];

const validatorDepositarSacar = [
  body('idConta', 'idConta é requerido').exists(),
  body('idConta', 'idConta é um inteiro').isInt(),
  body('valor', 'valor é requerido').exists(),
  body('valor', 'valor é numerico').isNumeric(),
  body('valor', 'valor deve ser maior que 0').isFloat({min: 1})
]

const validatorBloquear = [
  body('idConta', 'idConta é requerido').exists(),
  body('idConta', 'idConta é um inteiro').isInt(),
]

module.exports = (app) => {

  app.post(
    `/api/v1/contas`,
    validatorCriar,
    contasMiddleware.validatorMiddleware,
    contasController.criar
  );

  app.put(
    `/api/v1/contas/deposito`,
    validatorDepositarSacar,
    contasMiddleware.validatorMiddleware,
    contasMiddleware.verificaConta,
    contasController.depositar
  );

  app.get(
    `/api/v1/contas/:idConta`,
    contasMiddleware.verificaConta,
    contasController.consultar
  );

  app.put(
    `/api/v1/contas/sacar`,
    validatorDepositarSacar,
    contasMiddleware.validatorMiddleware,
    contasMiddleware.verificaConta,
    contasController.sacar
  );

  app.put(
    `/api/v1/contas/bloquear`,
    validatorBloquear,
    contasMiddleware.verificaConta,
    contasController.bloquear
  );

}