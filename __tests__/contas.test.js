const request = require('supertest');
const app = require('../src/app');
const knex = require('../src/config/knex');
const { expect } = require('@jest/globals');

describe("Contas", () => {

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

    it("usuario deve criar uma conta", async () => {

        const res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "joao luiz da cunha",
                cpf: "733.964.870-44",
                dataNascimento: "1950-12-13"
            });

        expect(res.status).toBe(200);
    });

    it("usuario deve criar uma conta com formato de data de nascimento errado", async () => {

        const res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "joao luiz da cunha",
                cpf: "733.964.870-44",
                dataNascimento: "1950/12/13"
            });

        expect(res.status).toBe(400);
    });

    it("usuario deve criar uma conta com cpf invalido", async () => {

        const res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "joao luiz da cunha",
                cpf: "733",
                dataNascimento: "1950/12/13"
            });

        expect(res.status).toBe(400);
    });

    it("usuario deve criar uma conta com cpf repetido", async () => {

        const res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "joao luiz da cunha",
                cpf: "733",
                dataNascimento: "1950/12/13"
            });

        expect(res.status).toBe(400);
    });

    it("usuario deve fazer deposito em conta", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "maria juventina",
                cpf: "627.709.970-17",
                dataNascimento: "1999-05-08"
            });

        const idConta = res.body.idConta;

        res = await request(app)
            .put(`/api/v1/contas/deposito`)
            .send({
                idConta,
                valor: 1232.12
            });

        expect(res.status).toBe(200);
    });

    it("usuario deve fazer deposito em conta com valor 0", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "ze da silva",
                cpf: "570.136.380-56",
                dataNascimento: "1989-09-08"
            });

        const idConta = res.body.idConta;

        res = await request(app)
            .put(`/api/v1/contas/deposito`)
            .send({
                idConta,
                valor: 0
            });

        expect(res.status).toBe(400);
    });

    it("usuario deve consultar valor do saldo", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "joaozinho",
                cpf: "445.601.910-77",
                dataNascimento: "1989-09-08"
            });

        const idConta = res.body.idConta;

        res = await request(app)
            .put(`/api/v1/contas/deposito`)
            .send({
                idConta,
                valor: 123.12
            });

        res = await request(app).get(`/api/v1/contas/${idConta}`)

        expect(res.status).toBe(200);
    });

    it("usuario deve fazer saque em conta", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "marrone",
                cpf: "071.688.420-80",
                dataNascimento: "1989-09-08"
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
                valor: 50
            });

        expect(res.status).toBe(200);
    });

    it("usuario deve fazer saque sem ter dinheiro em conta", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "rafaella",
                cpf: "213.481.310-55",
                dataNascimento: "1989-09-08"
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
                valor: 200
            });

        expect(res.status).toBe(400);
    });


    it("usuario deve bloquear sua conta", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "bruno",
                cpf: "554.010.970-85",
                dataNascimento: "1989-09-08"
            });

        const idConta = res.body.idConta;

        res = await request(app)
            .put(`/api/v1/contas/bloquear`)
            .send({
                idConta
            });

        expect(res.status).toBe(200);
    });

    it("usuario deve fazer deposito em uma conta bloqueada", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "geraldo",
                cpf: "436.419.300-30",
                dataNascimento: "1989-09-08"
            });

        const idConta = res.body.idConta;

        res = await request(app)
            .put(`/api/v1/contas/bloquear`)
            .send({
                idConta
            });

        res = await request(app)
            .put(`/api/v1/contas/deposito`)
            .send({
                idConta,
                valor: 123.12
            });

        expect(res.status).toBe(400);
    });

    it("usuario deve fazer saque em uma conta bloqueada", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "euniza",
                cpf: "498.999.340-38",
                dataNascimento: "1989-09-08"
            });

        const idConta = res.body.idConta;

        res = await request(app)
            .put(`/api/v1/contas/bloquear`)
            .send({
                idConta
            });

        res = await request(app)
            .put(`/api/v1/contas/sacar`)
            .send({
                idConta,
                valor: 123.12
            });

        expect(res.status).toBe(400);
    });

    it("usuario deve fazer consulta de saldo em uma conta bloqueada", async () => {

        let res = await request(app)
            .post(`/api/v1/contas`)
            .send({
                nome: "gustavo",
                cpf: "836.725.270-50",
                dataNascimento: "1989-09-08"
            });

        const idConta = res.body.idConta;

        res = await request(app)
            .put(`/api/v1/contas/bloquear`)
            .send({
                idConta
            });

        res = await request(app).get(`/api/v1/contas/${idConta}`)

        expect(res.status).toBe(400);
    });

});