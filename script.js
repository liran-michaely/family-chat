// Family Chat application logic.
//
// This script handles loading and persisting messages to localStorage, prompting
// users to enter their name on first load, and rendering messages in the UI.
// Because GitHub Pages only serves static files, all chat data is stored
// client‑side using localStorage. Messages are not synchronized between
// different devices or users unless you manually share the same browser
// profile.

(() => {
  const STORAGE_KEY_MESSAGES = 'familyChatMessages';
  const STORAGE_KEY_USERNAME = 'familyChatUsername';

  let messages = [];
  let currentUser = null;

  /**
   * Load messages from localStorage.
   * Returns an array of message objects with the shape
   * { username: string, text: string, timestamp: number }.
   */
  function loadMessages() {
    const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (err) {
      console.error('Failed to parse messages from localStorage', err);
    }
    return [];
  }

  /**
   * Save messages to localStorage.
   */
  function saveMessages() {
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  }

  /**
   * Prompt the user for their name if not already stored.
   */
  function ensureUsername() {
    const stored = localStorage.getItem(STORAGE_KEY_USERNAME);
    if (stored) {
      currentUser = stored;
      hideUsernameModal();
      return;
    }
    // Show modal to prompt for username
    const modal = document.getElementById('usernameModal');
    modal.style.display = 'flex';
  }

  /**
   * Hide the username modal.
   */
  function hideUsernameModal() {
    const modal = document.getElementById('usernameModal');
    modal.style.display = 'none';
  }

  /**
   * Save the username entered in the modal and start the chat.
   */
  function saveUsername() {
    const input = document.getElementById('usernameInput');
    const name = input.value.trim();
    if (!name) {
      alert('Please enter a valid name.');
      return;
    }
    currentUser = name;
    localStorage.setItem(STORAGE_KEY_USERNAME, currentUser);
    hideUsernameModal();
    renderMessages();
  }

  /**
   * Format a timestamp into a human‑readable string.
   * @param {number} ts Unix timestamp in milliseconds.
   */
  function formatTimestamp(ts) {
    const date = new Date(ts);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Render all messages to the UI.
   */
  function renderMessages() {
    const container = document.getElementById('messages');
    container.innerHTML = '';
    messages.forEach(msg => {
      const msgDiv = document.createElement('div');
      msgDiv.classList.add('message');
      if (currentUser && msg.username === currentUser) {
        msgDiv.classList.add('user');
      } else {
        msgDiv.classList.add('other');
      }
      // Meta: username and timestamp
      const metaDiv = document.createElement('div');
      metaDiv.classList.add('meta');
      metaDiv.textContent = `${msg.username} • ${formatTimestamp(msg.timestamp)}`;
      const textDiv = document.createElement('div');
      textDiv.classList.add('text');
      textDiv.textContent = msg.text;
      msgDiv.appendChild(metaDiv);
      msgDiv.appendChild(textDiv);
      container.appendChild(msgDiv);
    });
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
  }

  /**
   * Handle sending a message when the send button is clicked or Enter is pressed.
   */
  function handleSendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if (!text) return;
    if (!currentUser) {
      // If somehow user bypassed the modal, re‑prompt
      ensureUsername();
      return;
    }
    const newMessage = {
      username: currentUser,
      text,
      timestamp: Date.now(),
    };
    messages.push(newMessage);
    saveMessages();
    renderMessages();
    input.value = '';
    input.focus();
  }

  /**
   * Initialize event listeners.
   */
  function initEventHandlers() {
    // Send button click
    const sendBtn = document.getElementById('sendButton');
    sendBtn.addEventListener('click', handleSendMessage);
    // Enter key in message input
    const msgInput = document.getElementById('messageInput');
    msgInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
      }
    });
    // Save username button
    const saveBtn = document.getElementById('saveUsernameButton');
    saveBtn.addEventListener('click', saveUsername);
    // Allow pressing Enter in username modal to submit
    const usernameInput = document.getElementById('usernameInput');
    usernameInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveUsername();
      }
    });
  }

  /**
   * Entry point: load existing messages, set up user, and render UI.
   */
  function startApp() {
    messages = loadMessages();
    ensureUsername();
    renderMessages();
    initEventHandlers();
  }

  // Kick off the application when DOM is ready
  document.addEventListener('DOMContentLoaded', startApp);
})();