
    const chatContainer = document.getElementById('chat-container');
    const chatHeader = document.getElementById('chat-header');
    const chatBody = document.getElementById('chat-body');
    const toggleIcon = document.getElementById('toggle-icon');
    const recentChats = document.getElementById('recent-chats');
    const friendList = document.getElementById('friend-list');
    const chatContent = document.getElementById('chat-content');
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const currentChatName = document.getElementById('current-chat-name');
    const backButton = document.querySelector('.back-button');
    const newChatBtn = document.getElementById('new-chat-btn');
    const notificationIndicator = document.getElementById('notification-indicator');

    let isExpanded = false;
    let currentChat = null;
    let currentView = 'recent-chats';

    const chats = [
        { id: 1, name: "Alice", messages: [
            { id: 1, text: "Hey there!", sender: "other", read: true },
            { id: 2, text: "Hi Alice! How are you?", sender: "user", read: true },
            { id: 3, text: "I'm good, thanks!", sender: "other", read: false },
        ]},
        { id: 2, name: "Bob", messages: [
            { id: 1, text: "Did you see the game last night?", sender: "other", read: true },
            { id: 2, text: "Yeah, it was amazing!", sender: "user", read: true },
        ]},
        { id: 3, name: "Charlie", messages: [
            { id: 1, text: "Meeting at 3pm today", sender: "other", read: true },
            { id: 2, text: "I'll be there", sender: "user", read: true },
            { id: 3, text: "Great, see you then!", sender: "other", read: false },
        ]},
    ];

    const friends = [
        { id: 4, name: "David" },
        { id: 5, name: "Emma" },
        { id: 6, name: "Frank" },
        { id: 7, name: "Grace" },
    ];

    function toggleChat() {
        isExpanded = !isExpanded;
        chatBody.style.display = isExpanded ? 'block' : 'none';
        toggleIcon.className = isExpanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        if (isExpanded && !currentChat) {
            showRecentChats();
        }
        updateNotificationIndicator();
    }

    function showRecentChats() {
        currentView = 'recent-chats';
        recentChats.style.display = 'block';
        friendList.style.display = 'none';
        chatContent.style.display = 'none';
        newChatBtn.style.display = 'block';
        recentChats.innerHTML = chats.map(chat => {
            const lastMessage = chat.messages[chat.messages.length - 1];
            const unreadClass = !lastMessage.read && lastMessage.sender === 'other' ? 'fw-bold' : '';
            return `
                <a href="#" class="list-group-item list-group-item-action chat-item" data-chat-id="${chat.id}">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${chat.name}</h5>
                        <small class="text-muted">3 days ago</small>
                    </div>
                    <p class="mb-1 ${unreadClass}">${lastMessage.text}</p>
                </a>
            `;
        }).join('');
        updateNotificationIndicator();
    }

    function showFriendList() {
        currentView = 'friend-list';
        recentChats.style.display = 'none';
        friendList.style.display = 'block';
        chatContent.style.display = 'none';
        newChatBtn.style.display = 'none';
        friendList.innerHTML = `
            <div class="list-group-item bg-light">
                <i class="fas fa-arrow-left back-button me-2"></i>
                <span>New Chat</span>
            </div>
            ${friends.map(friend => `
                <a href="#" class="list-group-item list-group-item-action friend-item" data-friend-id="${friend.id}">
                    <h5 class="mb-1">${friend.name}</h5>
                </a>
            `).join('')}
        `;
    }

    function renderMessages() {
        if (!currentChat) return;
        chatMessages.innerHTML = currentChat.messages.map(message => `
            <div class="message ${message.sender}">
                ${message.text}
            </div>
        `).join('');
        chatMessages.scrollTop = chatMessages.scrollHeight;
        markMessagesAsRead();
    }

    function addMessage(text, sender) {
        if (!currentChat) return;
        currentChat.messages.push({ id: currentChat.messages.length + 1, text, sender, read: sender === 'user' });
        renderMessages();
        if (!isExpanded) {
            updateNotificationIndicator();
        }
    }

    function openChat(chatId) {
        currentChat = chats.find(chat => chat.id === chatId);
        if (currentChat) {
            currentView = 'chat';
            recentChats.style.display = 'none';
            friendList.style.display = 'none';
            chatContent.style.display = 'block';
            newChatBtn.style.display = 'none';
            currentChatName.textContent = currentChat.name;
            renderMessages();
        }
    }

    function startNewChat(friendId) {
        const friend = friends.find(f => f.id === friendId);
        if (friend) {
            const newChat = { id: chats.length + 1, name: friend.name, messages: [] };
            chats.push(newChat);
            currentChat = newChat;
            openChat(newChat.id);
        }
    }

    function markMessagesAsRead() {
        if (currentChat) {
            currentChat.messages.forEach(message => message.read = true);
        }
        updateNotificationIndicator();
    }

    function updateNotificationIndicator() {
        const hasUnreadMessages = chats.some(chat => 
            chat.messages.some(message => !message.read && message.sender === 'other')
        );

        notificationIndicator.style.display = hasUnreadMessages && !isExpanded ? 'block' : 'none';
    }

    chatHeader.addEventListener('click', toggleChat);

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = messageInput.value.trim();
        if (messageText && currentChat) {
            addMessage(messageText, 'user');
            messageInput.value = '';
        }
    });

    recentChats.addEventListener('click', (e) => {
        e.preventDefault();
        const chatItem = e.target.closest('.chat-item');
        if (chatItem) {
            const chatId = parseInt(chatItem.dataset.chatId);
            openChat(chatId);
        }
    });

    friendList.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('back-button')) {
            showRecentChats();
        } else {
            const friendItem = e.target.closest('.friend-item');
            if (friendItem) {
                const friendId = parseInt(friendItem.dataset.friendId);
                startNewChat(friendId);
            }
        }
    });

    backButton.addEventListener('click', () => {
        currentChat = null;
        showRecentChats();
    });

    newChatBtn.addEventListener('click', showFriendList);

    // Simulate receiving a new message every 10 seconds
    setInterval(() => {
        const randomChatIndex = Math.floor(Math.random() * chats.length);
        const randomChat = chats[randomChatIndex];
        addMessage(`New message at ${new Date().toLocaleTimeString()}`, 'other');
        if (currentChat !== randomChat || !isExpanded) {
            showRecentChats();
        }
    }, 10000);

    showRecentChats();
    updateNotificationIndicator();
