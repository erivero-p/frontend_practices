
/* the three tabs available on the chat */
const recentChatsTab = document.getElementById('recent-chats');
const newChatTab = document.getElementById('new-chat');
const chatTab = document.getElementById('chat-window');

/* chat header and body */
const chatHeader = document.getElementById('chat-header');
const chatBody = document.getElementById('chat-body');

/* buttons and icons*/
const newChatBtn = document.getElementById('new-chat-btn');
const backToRecents = document.getElementById('back-to-recents');
const toggleIcon = document.getElementById('toggle-icon');

/* utils */
let isExpanded = false;
let hasUnreadMessages = true; //hardcoded for now
let currentChat = null;
let currentView = 'recent-chats';


/* provisional data */
const friends = [
	{ id: 6, name: "albagar4" },
	{ id: 7, name: "jariza-o" },
	{ id: 8, name: "marirodr" },
	{ id: 9, name: "erivero-" },
];
const chats = [
	{ id: 1, name: "Alice", messages: [
		{ id: 1, text: "Hey there!", sender: "in", read: true },
		{ id: 2, text: "Hi Alice! How are you?", sender: "out", read: true },
		{ id: 3, text: "I'm good, thanks!", sender: "in", read: false },
	]},
	{ id: 2, name: "Bob", messages: [
		{ id: 1, text: "Did you see the game last night?", sender: "in", read: true },
		{ id: 2, text: "Yeah, it was amazing!", sender: "out", read: true },
	]},
	{ id: 3, name: "Charlie", messages: [
		{ id: 1, text: "Meeting at 3pm today", sender: "in", read: true },
		{ id: 2, text: "I'll be there", sender: "out", read: true },
		{ id: 3, text: "Great, see you then!", sender: "in", read: false },
	]},
	{ id: 4, name: "David", messages: [
		{ id: 1, text: "How's the project going?", sender: "in", read: true },
		{ id: 2, text: "On track, thanks for asking!", sender: "out", read: true },
	]},
	{ id: 5, name: "Emma", messages: [
		{ id: 1, text: "Lunch tomorrow?", sender: "in", read: true },
		{ id: 2, text: "Sounds good!", sender: "out", read: true },
	]},
];


chatHeader.addEventListener('click', toggleChat);

function toggleChat() {
	isExpanded = !isExpanded; /* inverts variable value, so if its expanded and you toggle, it should close */
	chatBody.style.display = isExpanded ? 'block' : 'none';
	toggleIcon.className = isExpanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
 	if (isExpanded && !currentChat) {
		showRecentChats();
	}
	updateNotificationIndicator();
}

newChatBtn.addEventListener('click', showFriendList);

function showFriendList() {

	currentView = 'friend-list';
	recentChatsTab.style.display = 'none';
	newChatTab.style.display = 'block';
	renderFriendList();
//	updateNotificationIndicator();
}

function renderFriendList() {
    const friendList = document.getElementById('friends-list');

	friendList.innerHTML = '';
    friends.forEach(friend => {

        const friendLink = document.createElement('a');
        friendLink.href = '#';
        friendLink.className = 'list-group-item list-group-item-action';
        
        const friendName = document.createElement('h6');
        friendName.className = 'mb-1';
        friendName.textContent = friend.name;
        
        friendLink.appendChild(friendName);
        
        friendLink.addEventListener('click', () => startChat(friend));
        friendList.appendChild(friendLink);
    });
}

backToRecents.addEventListener('click', showRecentChats);

function showRecentChats() {

	currentView = 'recent-chats';
	recentChatsTab.style.display = 'block';
	newChatTab.style.display = 'none';
	renderRecentChats();
}

function renderRecentChats() {
	const recentChats = document.getElementById('recent-chats-list');
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
}

function openChat(chatId) {
	currentChat = chats.find(chat => chat.id === chatId);
	if (currentChat) {
		currentView = 'chat';
		recentChatsTab.style.display = 'none';
		newChatTab.style.display = 'none';
		chatTab.style.display = 'block';
		const chatName = document.getElementById('current-chat-name');
		chatName.textContent = currentChat.name;
		renderChat();
	} 
}

function renderChat() {	
	if (currentChat)
	{
		const chatMessages = document.getElementById('chat-messages');
		chatMessages.innerHTML = currentChat.messages.map(message => `
			<div class="message ${message.sender}">
				${message.text}
			</div>
		`).join('');
		chatMessages.scrollTop = chatMessages.scrollHeight; //scrolls to the bottom ensuring the last message is visible
	//	markMessagesAsRead();	
	}
}

recentChatsTab.addEventListener('click', event => {
	event.preventDefault();
	const chatItem = event.target.closest('.chat-item');
	if (chatItem) {
		openChat(parseInt(chatItem.dataset.chatId));
	}
});

function updateNotificationIndicator() {
	const notificationIndicator = document.getElementById('notification-indicator');
	notificationIndicator.style.display =  hasUnreadMessages && isExpanded ? 'none' : 'block';
}
