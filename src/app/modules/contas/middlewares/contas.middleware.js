const contasRepository = require('../../../repositories/contas.repository');

const verificaConta = async (req, res, next) => {
    const idConta = req.body.idConta ? req.body.idConta : req.params.idConta;

    const conta = await contasRepository.findById(idConta);
    if (!conta)
        return res.status(400).json({ message: 'Conta inexistente' });

    if (conta.flagAtivo)
        return res.status(400).json({ message: 'Conta bloqueada' });

    next();

}

module.exports = {
    verificaConta
}