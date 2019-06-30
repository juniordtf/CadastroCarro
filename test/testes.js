const expect = require("chai").expect;
const carro = require("../carro.js");

//Testes de cadastro (CREATE)

describe("Placa", function() {
  it("Tamanho do campo placa não permitido", function() {
    var abc = {
      placa: "abcdefg12345",
      chassi: "1234565345cv23423d4",
      renavam: "21212939",
      modelo: "siena",
      marca: "Fiat",
      ano: "2017"
    };
    expect(carro.cadastrar(abc)).to.equal("Placa invalida");
  });
});

describe("Placa", function() {
  it("Placa não informada", function() {
    var abc = {
      chassi: "1234565345cv23423d4",
      renavam: "21212939",
      modelo: "siena",
      marca: "Fiat",
      ano: "2017"
    };
    expect(carro.cadastrar(abc)).to.equal("Placa invalida");
  });
});

describe("Ano", function() {
  it("Campo ano inválido", function() {
    var abc = {
      placa: "abc2345",
      chassi: "1234565345cv23423d4",
      renavam: "21212939",
      modelo: "siena",
      marca: "Fiat",
      ano: "cvb5"
    };
    expect(carro.cadastrar(abc)).to.equal("Campo ano inválido");
  });
});

//Teste para buscas (READ)

describe("Listagem", function() {
  it("Banco sem conteúdo", function() {
    carro.visualizar().then(function(results) {
      expect(results.length > 0).to.equal(true);
    });
  });
});

describe("Cadastro inexistente", function() {
  it("Cadastro inexistente", function() {
    carro.buscarPorId(123).then(function(result) {
      expect(result).to.equal(null);
    });
  });
});

//Teste para atualização (UPDATE)

describe("Alteração de placa não permitida", function() {
  it("Campo placa vazio", function() {
    var reg = {
      chassi: "1234565345cv23423d4",
      renavam: "21212939",
      modelo: "siena",
      marca: "Fiat",
      ano: "2017"
    };
    expect(carro.alterar(123, reg)).to.equal("Placa invalida");
  });
});

//Teste para exclusão (DELETE)

describe("Registro inexistente", function() {
  it("Registro não consta no banco de dados", function() {
    expect(carro.deletar(123)).to.equal(undefined);
  });
});
