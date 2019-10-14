"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../src/index');

chai.use(chaiHttp);
chai.use(require('chai-things'));

const should = chai.should();

describe('Testando Rotas Filazero Insights', (req, res) => {
    it('Testando rota de atendimento', (done) => {
        chai.request(server)
            .get('/atendimentos')
            .end((req, res) => {
                res.should.have.status(200);
                done();
            });
    
    });
});