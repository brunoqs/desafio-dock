const debug = require('debug')('app:icmbio');
const contasRepository = require('../../../repositories/contas.repository');
const pessoasRepository = require('../../../repositories/pessoas.repository');
const transacoesRepository = require('../../../repositories/transacoes.repository');

const criar = async (req, res, next) => {
    try {
        let { nome, cpf, dataNascimento } = req.body;
        cpf = cpf.replace(/\D+/g, '');

        const cpfExiste = await pessoasRepository.findByCpf(cpf);
        if (cpfExiste)
            return res.status(400).json({ message: 'Cpf já está cadastrado' });

        const pessoa = await pessoasRepository.save({ nome, cpf, dataNascimento });
        const conta = await contasRepository.save({ idPessoa: pessoa[0] });
        const data = await contasRepository.getAll(conta[0]);

        return res.status(200).json(data[0]);
    } catch (e) {
        debug(e);
        return res.status(500).json({ message: e.message });
    }
};

const depositar = async (req, res, next) => {
    try {
        const { idConta, valor } = req.body;

        const conta = await contasRepository.findById(idConta);

        const total = parseFloat(conta.saldo + valor);
        const contaUpdated = await contasRepository.updateSaldo(idConta, total);
        if (!contaUpdated)
            return res.status(400).json({ message: 'Ocorreu um erro ao efetuar o deposito' })

        await transacoesRepository.save({ idConta: conta.idConta, valor });

        return res.status(200).json({ message: 'Deposito feito com sucesso' });
    } catch (e) {
        debug(e);
        return res.status(500).json({ message: e.message });
    }
};

const consultar = async (req, res, next) => {
    try {
        const { idConta } = req.params;

        const conta = await contasRepository.findById(idConta);

        return res.status(200).json({ saldo: conta.saldo })
    } catch (e) {
        debug(e);
        return res.status(500).json({ message: e.message });
    }
};

const sacar = async (req, res, next) => {
    try {
        const { idConta, valor } = req.body;

        const conta = await contasRepository.findById(idConta);

        if (!(valor <= conta.saldo))
            return res.status(400).json({ message: 'Saldo insuficiente' });
        
        const total = parseFloat(conta.saldo - valor);
        const contaUpdated = await contasRepository.updateSaldo(idConta, total);
        if (!contaUpdated)
            return res.status(400).json({ message: 'Ocorreu um erro ao efetuar o deposito' })

        const valorNeg = valor * -1;
        await transacoesRepository.save({ idConta: conta.idConta, valor: valorNeg });

        return res.status(200).json({ message: 'Saque feito com sucesso' });
    } catch (e) {
        debug(e);
        return res.status(500).json({ message: e.message });
    }
};


const bloquear = async (req, res, next) => {
    try {
        const { idConta } = req.body;

        const conta = await contasRepository.findById(idConta);
        if (!conta)
            return res.status(400).json({ message: 'Conta inexistente' });
        
        const contaUpdated = await contasRepository.updateFlag(idConta, true);
        if (!contaUpdated)
            return res.status(400).json({ message: 'Ocorreu um erro ao efetuar o bloqueio' })

        return res.status(200).json({ message: 'Conta bloqueada com sucesso' });
    } catch (e) {
        debug(e);
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    criar,
    depositar,
    consultar,
    sacar,
    bloquear
}