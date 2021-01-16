const debug = require('debug')('app:dock');
const transacoesRepository = require('../../../repositories/transacoes.repository');

const extrato = async (req, res, next) => {
    try {
        const { idConta } = req.params;

        const extrato = await transacoesRepository.findByIdConta(idConta);
        if (!extrato.length)
            return res.status(400).json({ message: 'Extrato inexistente' });

        return res.status(200).json(extrato);
    } catch (e) {
        debug(e);
        return res.status(500).json({ message: e.message });
    }
};

const extratoPeriodo = async (req, res, next) => {
    try {
        const { idConta } = req.params;
        const { dataInicial, dataFinal } = req.body;

        const extrato = await transacoesRepository.findByIdContaPorPeriodo(idConta, [dataInicial, dataFinal]);
        if (!extrato.length)
            return res.status(400).json({ message: 'Extrato inexistente' });

        return res.status(200).json(extrato);
    } catch (e) {
        debug(e);
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    extrato,
    extratoPeriodo
}