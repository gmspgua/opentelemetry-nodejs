require('dotenv').config();
const express = require("express");
const axios = require("axios");
const PORT = process.env.PORT || "8080";
const HOST = process.env.HOST || "https://viacep.com.br";
const app = express();


app.get("/cep/:id",  async (req, res) => {
    const cepEndpoint = `${HOST}/ws/${req.params.id}/json/`;
    
    axios.get(cepEndpoint)
    .then(resp =>  res.status(200).json(resp.data))
    .catch(err =>  res.status(404).send("CEP nao encontrado"))
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});