const knex = require('../../config/knex');

class TransacoesRepository {

    save(data) {
        return knex('transacoes').insert(data);
    }

}

module.exports = new TransacoesRepository();
