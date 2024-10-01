const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Enviar requisição para o servidor
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});