//During the test the env variable is set to test

//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.use(chaiHttp);
//Our parent block
/*
 * Test the /GET route
 */

describe('Root testing: welcome', () => {
  before((done) => {
    done();
  });
  it('it should repond message welcome', (done) => {
    chai
      .request(app)
      .get('/api/v1')
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.have.property('message');
        // res.should.have.status(200);
        // res.body.should.have
        //   .property('message')
        //   .eql('Welcome to Dominators-Phantom-API!');
        // done();
      });
    done();
  });
});
