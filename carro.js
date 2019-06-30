const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:3001/meteor";

//const Schema = mongoose.Schema;

/*
  const Carros = new Schema({
    placa: {
      type: String,
      required: true
    },
    chassi: {
      type: String,
      required: true
    },
    renavam: {
      type: Number,
      required: true
    },
    modelo: {
      type: String,
      required: true
    },
    marca: {
      type: String,
      required: true
    },
    ano: {
      type: Number,
      required: true
    }
  });
  */

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log(err);
  }

  db = client.db("meteor");

  //Para cadastrar um carro
  exports.cadastrar = function(carro) {
    if (carro.placa == null) {
      return "Placa invalida";
    }
    if (carro.placa.length > 8) {
      return "Placa invalida";
    }
    if (isNaN(carro.ano)) {
      return "Campo ano inválido";
    }
    return db.collection("carro").insertOne(carro, (err, result) => {
      return err;
    });
  };

  //Para visualizar os carros
  exports.visualizar = function() {
    return new Promise(function(resolve, reject) {
      db.collection("carro")
        .find()
        .toArray((err, results) => {
          if (err) return reject(err);
          return resolve(results);
        });
    });
  };

  //Para buscar carro por Id
  exports.buscarPorId = function(id) {
    return new Promise(function(resolve, reject) {
      db.collection("carro").findOne({ _id: id }, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  };

  //Para alterar um carro
  exports.alterar = function(id, carro) {
    if (carro.placa == null) {
      return "Placa invalida";
    }
    return db.collection("carro").updateOne(
      { _id: id },
      {
        $set: {
          placa: carro.placa,
          chassi: carro.chassi,
          renavam: carro.renavam,
          modelo: carro.modelo,
          marca: carro.marca,
          ano: carro.ano
        }
      }
    );
  };

  //Para deletar um carro
  exports.deletar = function(id) {
    return db.collection("carro").deleteOne({ _id: id }, (err, result) => {
      return err;
    });
  };
});
