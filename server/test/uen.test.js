let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
let server = require('../server');

describe('UEN Validator test for general failures', () => {
    describe('/POST number', () => {
        it('Should return failure as it is a blank string', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': ''
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(false);
                    (res.body.type).should.be.eql('invalidUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return failure as it is a string with insufficient length', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '12345678'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(false);
                    (res.body.type).should.be.eql('invalidUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return failure as it is a string with too length', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '12345678910'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(false);
                    (res.body.type).should.be.eql('invalidUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return failure as it is a string with invalid characters', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '!12@3#A5#'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(false);
                    (res.body.type).should.be.eql('invalidUen');
                })
        })
    })
});

describe('UEN Validator test for Business UEN types', () => {
    describe('/POST number', () => {
        it('Should return success as this is a valid Business UEN format', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '12345678E'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(true);
                    (res.body.type).should.be.eql('businessUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return success as this is a valid Business UEN format', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '00000000e'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(true);
                    (res.body.type).should.be.eql('businessUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return success as this is a valid Business UEN format with small letter', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '12345678z'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(true);
                    (res.body.type).should.be.eql('businessUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return failure as this is a invalid Business UEN format with upper case alphabets', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': 'A2E45678E'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(false);
                    (res.body.type).should.be.eql('invalidBusinessUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return failure as this is a invalid Business UEN format with lower case alphabets', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': 'a2e45678e'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(false);
                    (res.body.type).should.be.eql('invalidBusinessUen');
                })
        })
    })

} )

describe('UEN Validator test for Local Business UEN types', () => {
    describe('/POST number', () => {
        it('Should return success as this is a valid Local Business UEN format', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '201912345E'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(true);
                    (res.body.type).should.be.eql('localBusinessUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return success as this is a valid Local Business UEN format', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '202200001W'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(true);
                    (res.body.type).should.be.eql('localBusinessUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return success as this is a valid Local Business UEN format even though there are spaces', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '   2022   00001W     '
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(true);
                    (res.body.type).should.be.eql('localBusinessUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return failure as this is a invalid Local Business UEN format with year ahead of current one', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '202500001W'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(false);
                    (res.body.type).should.be.eql('invalidLocalBusinessUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return failure as this is a invalid Local Business UEN format with no suffix', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '2025000012'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(false);
                    (res.body.type).should.be.eql('invalidLocalBusinessUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return failure as this is a invalid Local Business UEN format with invalid year', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '2EW5000012'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(false);
                    (res.body.type).should.be.eql('invalidLocalBusinessUen');
                })
        })
    })
})

describe('UEN Validator test for Other Entities UEN types', () => {

    describe('/POST number', () => {
        it('Should return success as this is a valid Other Entities UEN format', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': 'T23LL1234E'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(true);
                    (res.body.type).should.be.eql('otherEntitiesUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return success as this is a valid Other Entities UEN format with lower case letters', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': 's23LL1234e'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(true);
                    (res.body.type).should.be.eql('otherEntitiesUen');
                })
        })
    })


    describe('/POST number', () => {
        it('Should return success as this is a valid Other Entities UEN format with spaces', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': '   R23L   L1234e  '
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(true);
                    (res.body.type).should.be.eql('otherEntitiesUen');
                })
        })
    })


    describe('/POST number', () => {
        it('Should return failure as this is a invalid Other Entities UEN format as prefix is wrong', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': 'A23LL1234E'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(false);
                    (res.body.type).should.be.eql('invalidLocalBusinessOrOtherEntitiesUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return failure as this is a invalid Other Entities UEN format as prefix is wrong', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': 'Z23LL1234E'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(false);
                    (res.body.type).should.be.eql('invalidLocalBusinessOrOtherEntitiesUen');
                })
        })
    })

    describe('/POST number', () => {
        it('Should return failure as this is a invalid Other Entities UEN format as entity does not exist', ()=> {
            chai.request(server)
                .post('/uenValidation')
                .send({
                    'value': 'R23AB1234E'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.status).should.be.eql(false);
                    (res.body.type).should.be.eql('invalidOtherEntitiesUen');
                })
        })
    })


})