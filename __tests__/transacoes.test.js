const request = require('supertest');
const app = require('../src/app');
const { format, addDays } = require('date-fns');
const knex = require('../src/config/knex');
const { expect } = require('@jest/globals');

describe("Transacoes", () => {

    beforeAll(async () => {
        await knex('pessoas').truncate();
        await knex('contas').truncate();
        await knex('transacoes').truncate();
    });

    afterAll(async () => {
        await knex('pessoas').truncate();
        await knex('contas').truncate();
        await knex('transacoes').truncate();
    });

    it("usuario deve consultar extrato", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "raulira",
                cpf: "652.148.210-69",
                dataNascimento: "1950-12-13"
            });

        const idConta = res.body.idConta;

        res = await request(app)
            .put(`/api/v1/contas/deposito`)
            .send({
                idConta,
                valor: 123.12
            });

        res = await request(app)
            .put(`/api/v1/contas/sacar`)
            .send({
                idConta,
                valor: 10
            });


        res = await request(app).get(`/api/v1/transacoes/extrato/${idConta}`)

        expect(res.status).toBe(200);
    });

    it("usuario deve consultar extrato inexistente", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "heloiza",
                cpf: "539.233.120-32",
                dataNascimento: "1950-12-13"
            });

        const idConta = res.body.idConta;

        res = await request(app).get(`/api/v1/transacoes/extrato/${idConta}`)

        expect(res.status).toBe(400);
    });

    it("usuario deve consultar extrato por periodo", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "raulira",
                cpf: "743.119.150-20",
                dataNascimento: "1950-12-13"
            });
        
        const idConta = res.body.idConta;

        res = await request(app)
            .put(`/api/v1/contas/deposito`)
            .send({
                idConta,
                valor: 123.12
            });

        res = await request(app)
            .put(`/api/v1/contas/sacar`)
            .send({
                idConta,
                valor: 10
            });

        let dataFinal = new Date();
        dataFinal = addDays(dataFinal, 2);
        dataFinal = format(dataFinal, 'yyyy-MM-dd');

        res = await request(app)
            .post(`/api/v1/transacoes/extrato-periodo/${idConta}`)
            .send({
                dataInicial: format(new Date(), 'yyyy-MM-dd'),
                dataFinal
            });

        expect(res.status).toBe(200);
    });

    it("usuario deve consultar extrato inexistente por periodo", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "robson",
                cpf: "773.727.500-24",
                dataNascimento: "1950-12-13"
            });
        
        const idConta = res.body.idConta;

        let dataFinal = new Date();
        dataFinal = addDays(dataFinal, 2);
        dataFinal = format(dataFinal, 'yyyy-MM-dd');

        res = await request(app)
            .post(`/api/v1/transacoes/extrato-periodo/${idConta}`)
            .send({
                dataInicial: format(new Date(), 'yyyy-MM-dd'),
                dataFinal
            });

        expect(res.status).toBe(400);
    });

    it("usuario deve consultar extrato passando datas erradas", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "arthur",
                cpf: "647.939.570-05",
                dataNascimento: "1950-12-13"
            });
        
        const idConta = res.body.idConta;

        res = await request(app)
            .post(`/api/v1/transacoes/extrato-periodo/${idConta}`)
            .send({
                dataInicial: '20/07/2020',
                dataFinal: '20/12/2020'
            });

        expect(res.status).toBe(400);
    });

});