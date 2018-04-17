const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http')
chai.use(chaiHttp);



describe('Index test', function(){  
  const app = require('../app');
  it('Index', function(done){
    chai.request(app)
      .get('/')
      .end((error, response) => {
        if(error) done(error);
        expect(response).to.not.have.status(400)
        done()
      })
  })  
})