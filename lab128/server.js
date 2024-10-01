const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/enviar-email', (req, res) => {
    const { nome, email, mensagem } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host:"smtp.gmail.com",
        port:587,
        secure: true,
        auth: {
            user: 'bemehene@gmail.com',
            pass: 'Snow9060@'
        }
    });

    let mailOptions = {
        from: 'bemehene@gmail.com',
        to: 'bernardoatadia0609@gmail.com',
        subject: 'Assunto do email',
        text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });

    res.send('Email enviado com sucesso!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});