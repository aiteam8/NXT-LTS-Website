/**
 * NXT LTS Chatbot Widget
 * Floating chat widget with client-side message storage and real-time streaming
 */

const arWelMsg = '<div class="nxt-chatbot-message-content"><strong>أهلاً بكم في NXT LTS!</strong> اسألني عن أي شيء يخص خدماتنا، حلولنا، وكيف يمكننا مساعدة عملك.</div>'
const enWelMsg = '<div class="nxt-chatbot-message-content"><strong>Welcome to NXT LTS!</strong><br>Ask me anything about our services, solutions, and how we can help your business.</div>'

class ChatbotWidget {
  constructor() {
    // Configuration - use window.NXT_RAG_API_BASE if available, otherwise use current origin
    const apiBase = window.location.origin;
    this.apiUrl = `${apiBase}/chat`;
    this.storageKey = 'nxt_lts_chatbot_messages';
    this.isOpen = false;
    this.isStreaming = false;

    // DOM elements (initialized on first use)
    this.widget = null;
    this.floatingButton = null;
    this.chatWindow = null;
    this.messagesContainer = null;
    this.inputField = null;
    this.sendButton = null;

    // Messages array
    this.messages = [];

    // Initialize widget
    this.init();
  }

  init() {
    // Load messages from localStorage
    this.loadMessages();

    // Create and inject widget HTML
    this.createWidget();

    // Attach event listeners
    this.attachEventListeners();

    console.log('✓ Chatbot widget initialized');
  }

  /**
   * Load messages from localStorage
   */
  loadMessages() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      this.messages = stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('Failed to load messages from localStorage:', e);
      this.messages = [];
    }
  }

  /**
   * Save messages to localStorage
   */
  saveMessages() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.messages));
    } catch (e) {
      console.warn('Failed to save messages to localStorage:', e);
    }
  }

  /**
   * Create widget DOM structure
   */
  createWidget() {
    // Create widget container
    const widgetHTML = `
      <div id="nxt-chatbot-widget" class="nxt-chatbot-widget">
        <!-- Floating Button -->
        <button id="nxt-chatbot-button" class="nxt-chatbot-button" aria-label="Open chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        <!-- Chat Window -->
        <div id="nxt-chatbot-window" class="nxt-chatbot-window hidden">
          <!-- Header -->
          <div class="nxt-chatbot-header">
            <h2>NXT LTS Assistant</h2>
            <div class="nxt-chatbot-header-buttons">
              <button id="nxt-chatbot-clear" class="nxt-chatbot-clear-btn" aria-label="Clear chat history" title="Clear chat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
              <button id="nxt-chatbot-close" class="nxt-chatbot-close-btn" aria-label="Close chat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <!-- Messages Container -->
          <div id="nxt-chatbot-messages" class="nxt-chatbot-messages"></div>

          <!-- Input Area -->
          <div class="nxt-chatbot-input-area">
            <input
              id="nxt-chatbot-input"
              type="text"
              placeholder="Ask me anything..."
              class="nxt-chatbot-input"
              autocomplete="off"
            />
            <button id="nxt-chatbot-send" class="nxt-chatbot-send-btn" aria-label="Send message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.9702544,11.6889879 22.9702544,11.5318905 22.9702544,11.4744748 L22.9702544,11.3173774 C22.9702544,10.3747931 22.6563168,9.43220768 21.714504,8.9609155 L4.13399899,0.163561631 C3.34915502,0.0434575139 2.40734225,0.1634575139 1.77946707,0.6347496 C0.994623095,1.10604706 0.837654326,2.0486314 1.15159189,2.98722276 L3.03521743,9.42821575 C3.03521743,9.5883127 3.19218622,9.74541014 3.50612381,9.74541014 L16.6915026,10.5309012 C16.6915026,10.5309012 17.1624089,10.5309012 17.1624089,10.0596191 L17.1624089,11.0022034 C17.1624089,11.5318905 16.6915026,11.4744748 16.6915026,12.4744748 Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    // Inject into body
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = widgetHTML;
    document.body.appendChild(tempDiv.firstElementChild);

    // Cache DOM elements
    this.widget = document.getElementById('nxt-chatbot-widget');
    this.floatingButton = document.getElementById('nxt-chatbot-button');
    this.chatWindow = document.getElementById('nxt-chatbot-window');
    this.messagesContainer = document.getElementById('nxt-chatbot-messages');
    this.inputField = document.getElementById('nxt-chatbot-input');
    this.sendButton = document.getElementById('nxt-chatbot-send');

    // Render existing messages
    this.renderMessages();
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Toggle chat window
    this.floatingButton.addEventListener('click', () => this.toggleChat());

    // Close button
    document.getElementById('nxt-chatbot-close').addEventListener('click', () => this.closeChat());

    // Clear chat button
    document.getElementById('nxt-chatbot-clear').addEventListener('click', () => this.clearChat());

    // Send button
    this.sendButton.addEventListener('click', () => this.handleSendMessage());

    // Enter key in input
    this.inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !this.isStreaming) {
        this.handleSendMessage();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeChat();
      }
    });
  }

  /**
   * Toggle chat window open/close
   */
  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  /**
   * Open chat window
   */
  openChat() {
    this.isOpen = true;
    this.chatWindow.classList.remove('hidden');
    this.floatingButton.classList.add('active');
    this.inputField.focus();
  }

  /**
   * Close chat window
   */
  closeChat() {
    this.isOpen = false;
    this.chatWindow.classList.add('hidden');
    this.floatingButton.classList.remove('active');
  }

  /**
   * Clear chat history with dropping animation
   */
  clearChat() {
    // Get all message elements
    const messages = this.messagesContainer.querySelectorAll('.nxt-chatbot-message');
    
    if (messages.length === 0) {
      return;
    }

    // Animate each message dropping and fading out
    messages.forEach((msg, index) => {
      // Stagger the animation delay for each message
      const delay = index * 50;
      setTimeout(() => {
        msg.classList.add('dropping');
      }, delay);
    });

    // Clear messages and localStorage after animation completes
    setTimeout(() => {
      this.messagesContainer.innerHTML = '';
      this.messages = [];
      this.saveMessages();
      
      // Show welcome message again
      const welcomeBubble = document.createElement('div');
      welcomeBubble.className = 'nxt-chatbot-message assistant welcome';
      welcomeBubble.innerHTML = document.documentElement.lang === 'en' ? enWelMsg : arWelMsg;
      this.messagesContainer.appendChild(welcomeBubble);
    }, messages.length * 50 + 300);
  }

  /**
   * Handle send message
   */
  async handleSendMessage() {
    const content = this.inputField.value.trim();

    if (!content) {
      return;
    }

    // Clear input
    this.inputField.value = '';

    // Add user message to conversation
    const userMessage = {
      role: 'user',
      content: content
    };

    this.messages.push(userMessage);
    this.saveMessages();

    // Render user message
    this.addMessageBubble('user', content);

    // Disable input while streaming
    this.isStreaming = true;
    this.inputField.disabled = true;
    this.sendButton.disabled = true;

    // Add assistant message placeholder with typing indicator
    const assistantBubble = this.addMessageBubble('assistant', '', true);

    try {
      // Send request to backend
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: this.messages })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Stream the response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      let charIndex = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        // Decode chunk
        const chunk = decoder.decode(value, { stream: true });
        
        // Process each character with delay for visual streaming effect
        for (let i = 0; i < chunk.length; i++) {
          assistantContent += chunk[i];
          charIndex++;

          // Update assistant message bubble (remove typing indicator)
          assistantBubble.innerHTML = assistantContent;
          
          // Add subtle delay between characters for prominent streaming effect
          // Vary delay slightly to avoid monotonous animation
          const baseDelay = charIndex % 3 === 0 ? 15 : 8;
          await new Promise(resolve => setTimeout(resolve, baseDelay));
          
          this.scrollMessagesToBottom();
        }
      }

      // Clear typing indicator and set final content
      assistantBubble.innerHTML = assistantContent;

      // Add final message to conversation history
      const assistantMessage = {
        role: 'assistant',
        content: assistantContent
      };

      this.messages.push(assistantMessage);
      this.saveMessages();

    } catch (error) {
      console.error('Error sending message:', error);

      // Show error message
      assistantBubble.innerHTML = `⚠️ Error: ${error.message}. Please try again.`;
      assistantBubble.parentElement.classList.add('error');
    } finally {
      // Re-enable input
      this.isStreaming = false;
      this.inputField.disabled = false;
      this.sendButton.disabled = false;
      this.inputField.focus();
    }
  }

  /**
   * Add a message bubble to the chat
   */
  addMessageBubble(role, content, showTyping = false) {
    const bubble = document.createElement('div');
    bubble.className = `nxt-chatbot-message ${role}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'nxt-chatbot-message-content';
    
    if (showTyping) {
      // Add typing indicator animation
      contentDiv.innerHTML = '<span class="typing-indicator"><span></span><span></span><span></span></span>';
      contentDiv.classList.add('typing');
    } else {
      // Preserve newlines by converting them to <br> tags
      const sanitizedContent = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
      contentDiv.innerHTML = sanitizedContent;
    }

    bubble.appendChild(contentDiv);
    this.messagesContainer.appendChild(bubble);

    this.scrollMessagesToBottom();

    return contentDiv;
  }

  /**
   * Render all messages
   */
  renderMessages() {
    // Clear container
    this.messagesContainer.innerHTML = '';

    // Render each message
    this.messages.forEach((msg) => {
      this.addMessageBubble(msg.role, msg.content);
    });

    // Show welcome message if no messages yet
    if (this.messages.length === 0) {
      const welcomeBubble = document.createElement('div');
      welcomeBubble.className = 'nxt-chatbot-message assistant welcome';
      welcomeBubble.innerHTML = document.documentElement.lang === 'en' ? enWelMsg : arWelMsg;
      this.messagesContainer.appendChild(welcomeBubble);
    }
  }

  /**
   * Scroll messages to bottom
   */
  scrollMessagesToBottom() {
    setTimeout(() => {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }, 0);
  }
}

// Initialize widget when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new ChatbotWidget();
  });
} else {
  window.chatbot = new ChatbotWidget();
}
