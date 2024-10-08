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
        const message = chatInput.value;
        if (message) {
            console.log('Message:', message);
            addMessage(message, 'chat-bubble--out');
            chatInput.value = '';
            // getBotResponse(message); 
        }
    });

    function addMessage(message, senderClass) {
        const chatBody = document.querySelector('.card-body');
        if (!chatBody) {
            console.error('Chat container not found');
            return;
        }
        const messageRow = document.createElement('div');
        messageRow.classList.add('row', 'mb-3');
        
        const messageCol = document.createElement('div');
        messageCol.classList.add('col-12');
        
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('d-flex', senderClass === 'chat-bubble--out' ? 'justify-content-end' : 'align-items-center');
        
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('chat-bubble', senderClass);
        messageBubble.innerText = message;
        
        messageWrapper.appendChild(messageBubble);
        messageCol.appendChild(messageWrapper);
        messageRow.appendChild(messageCol);
        chatBody.appendChild(messageRow);
        
        console.log('Message added to chat:', messageBubble);
    }
});