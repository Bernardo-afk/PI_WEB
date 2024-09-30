const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  



app.post('/submit', (req, res) => {
  const { nome, email, mensagem } = req.body;
  const formData = {
    nome,
    email,
    mensagem,
  };

  const formUrl = 'https://formspree.io/f/xqkjnqkj';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  fetch(formUrl, {
    method: 'POST',
    headers,
    body: Object.keys(formData).map(key => `${key}=${formData[key]}`).join('&'),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      res.send('Formulário enviado com sucesso!');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Erro ao enviar formulário');
    });
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
