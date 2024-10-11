
/* the three tabs available on the chat */
const recentChatsTab = document.getElementById('recent-chats');
const friendListTab = document.getElementById('friends-list');
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

chatHeader.addEventListener('click', toggleChat);

function toggleChat() {
	isExpanded = !isExpanded; /* inverts variable value, so if its expanded and you toggle, it should close */
	chatBody.style.display = isExpanded ? 'block' : 'none';
	toggleIcon.className = isExpanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
/* 	if (isExpanded && !currentChat) {
		showRecentChats();
	} */
	updateNotificationIndicator();
}

function updateNotificationIndicator() {
	const notificationIndicator = document.getElementById('notification-indicator');
	notificationIndicator.style.display =  hasUnreadMessages && isExpanded ? 'none' : 'block';
}

newChatBtn.addEventListener('click', showFriendList);

function showFriendList() {

	recentChatsTab.style.display = 'none';
	friendListTab.style.display = 'block';
}


backToRecents.addEventListener('click', showRecentChats);

function showRecentChats() {

	recentChatsTab.style.display = 'block';
	friendListTab.style.display = 'none';
}

