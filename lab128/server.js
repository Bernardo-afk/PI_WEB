const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.use(express.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
        user: 'seu_usuario_smtp',
        pass: 'sua_senha_smtp'
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'seu_usuario_smtp',
        to: email,
        subject: `Mensagem de contato de ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao enviar email' });
        }
        res.json({ message: 'Email enviado com sucesso!' });
    });
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});