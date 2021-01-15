const knex = require('../../config/knex');

class PessoasRepository {

    save(data) {
        return knex('pessoas').insert(data);
    }

    findByCpf(cpf) {
        return knex('pessoas').where('cpf', cpf).first();
    }

}

module.exports = new PessoasRepository();
