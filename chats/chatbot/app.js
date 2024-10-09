document.addEventListener('DOMContentLoaded', () => {
    const chatToggler = document.querySelector('.chat-toggler');
    const chatBox = document.querySelector('.container');
    const icons = chatToggler.querySelectorAll('.material-symbols-outlined');
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-btn');

    chatToggler.addEventListener('click', () => {
        chatBox.classList.toggle('d-none');
        icons.forEach(icon => icon.classList.toggle('d-none'));
    });

    sendButton.addEventListener('click', () => {
        handleChat(chatInput.value);
    });

    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleChat(chatInput.value);
        }
    });
    
    function handleChat(message) {  
        if (message) {
            console.log('Message:', message);
            addMessage(message, 'chat-bubble--out');
            chatInput.value = '';
            getBotResponse(message); 
        }
    }

/* what Im doing here is knowing that my outgoing message has 
this format on the html doc, I create each div with the needed classes
    <div class="row mb-3">
    <div class="col-12 d-flex justify-content-end">
        <div class="chat-bubble chat-bubble--out">
            Fatal, gracias
        </div>
    </div> */
    
function getBotResponse(message) {
    
    setTimeout(() => {
        addMessage('Thinking...', 'chat-bubble--in');
        generateResponse(message);
    }, 500);
}

function generateResponse(userMessage) {
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    const requestOptions = { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }]
        }) 
    };
    console.log('Enviando solicitud a la API:', requestOptions);
    fetch(API_URL, requestOptions).then(response => response.json()).then(data => {
        console.log(data);
        addMessage(data.choices[0].message.content, 'chat-bubble--in');
    }).catch((error) => {
        console.error('Error:', error);
        addMessage('Aparentemente has agotado tu límite de solicitudes o eres un poco penca y no has hecho bien el código, quién sabe, pero bueno, si quieres una receta de lentejas mejor pregúntale a tu madre <3', 'chat-bubble--in');
    });
}
function addMessage(message, senderClass) {
    const chatBody = document.querySelector('.card-body');
    const messageRow = document.createElement('div');
    messageRow.classList.add('row', 'mb-3');
    
        const messageCol = document.createElement('div');
        messageCol.classList.add('col-12', 'd-flex', senderClass === 'chat-bubble--out' ? 'justify-content-end' : 'align-items-center');
        if (senderClass === 'chat-bubble--in') {
            const icon = document.createElement('span');
            icon.classList.add('material-symbols-outlined', 'me-3', 'toy');
            icon.innerText = 'smart_toy';
            messageCol.appendChild(icon);
        }
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('chat-bubble', senderClass);
        messageBubble.innerText = message;
        
        messageCol.appendChild(messageBubble);
        messageRow.appendChild(messageCol);
        chatBody.appendChild(messageRow);
        
        console.log('Message added to chat:', messageBubble);
    }
});