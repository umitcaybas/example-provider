const { Verifier } = require("@pact-foundation/pact")
const ProductRepository = require('./product.repository')
const { expect } = require("chai")
const Product = require("./product")
const app = require('express')();
app.use(require('./product.routes'));
const server = app.listen("8080");

// Verify that the provider meets all consumer expectations
describe("Pact Verification", () => {
  it("validates the expectations of Matching Service", () => {
    let opts = {
      providerBaseUrl: "http://localhost:8080",
      provider: "MyProvider",
      pactBrokerUrl: "http://localhost:81",
      publishVerificationResult: true,
      providerVersion: "5.0",
    }
    
    return new Verifier(opts).verifyProvider().then(output => {
      console.log("Pact Verification Complete!")
      console.log(output)
    })
  })
  after(() => {
    server.close()
  })
})