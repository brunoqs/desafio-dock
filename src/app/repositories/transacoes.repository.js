const knex = require('../../config/knex');

class TransacoesRepository {

    save(data) {
        return knex('transacoes').insert(data);
    }

    findByIdConta(idConta) {
        return knex('transacoes')
            .select('valor', 'dataTransacao')
            .where('idConta', idConta);
    }

    findByIdContaPorPeriodo(idConta, datas) {
        return knex('transacoes')
            .select('valor', 'dataTransacao')
            .where('idConta', idConta)
            .whereBetween('dataTransacao', datas);
    }

}

module.exports = new TransacoesRepository();
