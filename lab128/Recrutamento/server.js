require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let verificationCode = '';

// Configurações do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Rota para enviar o email com o código de verificação
app.post('/send-verification', (req, res) => {
    const { name, email, message } = req.body;
    verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Gera um código de 6 dígitos

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Código de Verificação',
        text: `Seu código de verificação é: ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erro ao enviar o email:", error); // Log do erro
            return res.status(500).send('Erro ao enviar o email.');
        }
        console.log('Email enviado: ' + info.response); // Log de sucesso
        // Redireciona para a página de verificação
        res.redirect(`/verify.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`);
    });
});

// Rota para verificar o código e enviar os dados para o Formspree
app.post('/verify', (req, res) => {
    const { code, name, email, message } = req.body;

    if (code === verificationCode) {
        // Envia os dados para o Formspree
        const formspreeUrl = 'https://formspree.io/f/manwrkya'; // Substitua pelo seu Formspree ID

        fetch(formspreeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        })
        .then(response => {
            if (response.ok) {
                res.send('Formulário enviado com sucesso!');
            } else {
                console.error("Erro ao enviar para o Formspree:", response.statusText); // Log do erro
                res.status(500).send('Erro ao enviar o formulário.');
            }
        })
        .catch(err => {
            console.error("Erro ao enviar para o Formspree:", err); // Log do erro
            res.status(500).send('Erro ao enviar o formulário.');
        });
    } else {
        res.send('Código incorreto.');
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
