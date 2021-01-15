const knex = require('../../config/knex');

class ContasRepository {

    save(data) {
        return knex('contas').insert(data);
    }

    getAll(idConta) {
        return knex('contas')
            .join('pessoas', 'contas.idPessoa', '=', 'pessoas.idPessoa')
            .where('idConta', idConta);
    }

    updateSaldo(idConta, saldo) {
        return knex('contas')
            .where('idConta', idConta)
            .update({
                saldo
            });
    }

    updateFlag(idConta, flagAtivo) {
        return knex('contas')
            .where('idConta', idConta)
            .update({
                flagAtivo
            });
    }

    findById(idConta) {
        return knex('contas').where('idConta', idConta).first();
    }

}

module.exports = new ContasRepository();
