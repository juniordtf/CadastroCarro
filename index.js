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

  carro.cadastrar(req, res);
});

//Para visualizar os carros
app.get("/carro", (req, res) => {
  carro.visualizar(req, res);
});

//Para buscar carro por Id
app.get("/carro/:id", (req, res) => {
  let id = new ObjectId(req.params.id);
  carro.buscarPorId(req, res);
});

//Para alterar um carro
app.put("/carro/:id", (req, res) => {
  let id = new ObjectId(req.params.id);
  carro.alterar(req, res);
});

//Para deletar um carro
app.delete("/carro/:id", (req, res) => {
  let id = new ObjectId(req.params.id);
  let err = carro.deletar(id);
  if (err) return res.send(err);
  res.redirect({});
});
