const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para servir o HTML do formulário
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Rota para receber dados do formulário
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Nome: ${name}, Email: ${email}, Mensagem: ${message}`);
    res.send('Formulário enviado com sucesso!');
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
