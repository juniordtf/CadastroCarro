const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;
const carro = require("./carro.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(4321, () => {
  console.log("escutando em localhost:4321");
});

app.get("/", (req, res) => {
  res.send("Hello CadastroCarro!");
});

//Para cadastrar um carro
app.post("/carro", (req, res) => {
  console.log(req.body);

  let err = carro.cadastrar(req.body);

  if (err) {
    res.send(err);
  }

  res.send(req.body);
});

//Para visualizar os carros
app.get("/carro", (req, res) => {
  carro.visualizar().then(function(results) {
    console.log(results);
    console.log("index.js");
    res.send(results);
  });
});

//Para buscar carro por Id
app.get("/carro/:id", (req, res) => {
  let id = new ObjectId(req.params.id);
  carro.buscarPorId(id).then(function(result) {
    res.send(result);
  });
});

//Para alterar um carro
app.put("/carro/:id", (req, res) => {
  let id = new ObjectId(req.params.id);
  let result = carro.alterar(id, req.body);
  res.send(result);
});

//Para deletar um carro
app.delete("/carro/:id", (req, res) => {
  let id = new ObjectId(req.params.id);
  let err = carro.deletar(id);
  if (err) return res.send(err);
  res.redirect({});
});
