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
  exports.cadastrar = function(req, res) {
    db.collection("carro").insertOne(req.body, (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send(req.body);
    });
  };

  //Para visualizar os carros
  exports.visualizar = function(req, res) {
    db.collection("carro")
      .find()
      .toArray((err, results) => {
        if (err) {
          res.send(err);
        }
        res.send(results);
      });
  };

  //Para buscar carro por Id
  exports.buscarPorId = function(req, res) {
    db.collection("carro").findOne({ _id: id }, (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send(result);
    });
  };

  //Para alterar um carro
  exports.alterar = function(req, res) {
    db.collection("carro").updateOne(
      { _id: id },
      {
        $set: {
          placa: req.body.placa,
          chassi: req.body.chassi,
          renavam: req.body.renavam,
          modelo: req.body.modelo,
          marca: req.body.marca,
          ano: req.body.ano
        }
      },
      (err, result) => {
        if (err) {
          res.send(err);
        }

        res.send(result);
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
