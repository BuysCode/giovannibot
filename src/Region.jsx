import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Sparkles, Home } from 'lucide-react';
import './region.css';
import { generateResponse } from './functions';
import Header from './components/Header';

function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`message-wrapper ${isUser ? 'message-user' : 'message-assistant'}`}>
      <div className="message-container">
        {!isUser && (
          <div className="message-icon">
            <Sparkles size={20} />
          </div>
        )}
        <div className={`message-content ${!isUser ? 'message-bot-background' : ''}`}>
          {!isUser && <div className="message-label">Giovanni Bot</div>}
          {isUser && <div className="message-label-user">Tu</div>}
          <div className="message-text">{message.content}</div>
        </div>
      </div>
    </div>
  );
}

export default function ItalianChatbot() {
  const { regionName } = useParams();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const normalizeRegionName = (name) => {
    if (!name) return 'Lazio';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const currentRegion = normalizeRegionName(regionName);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [regionName]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const response = await generateResponse(currentRegion, inputMessage);
      
      const botMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erro:', error);
      
      const errorMessage = {
        role: 'assistant',
        content: "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    
    // Auto resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  };

  const prompts = [
    { icon: '🏛️', text: 'Qual a capital?' },
    { icon: '🍝', text: 'Gastronomia' },
    { icon: '🎨', text: 'Arte e cultura' },
    { icon: '🏔️', text: 'Locais para turismo' }
  ];

  return (
    <div className="gemini-container">
      <Header currentRegion={currentRegion} />

      <main className="gemini-main">
        {messages.length === 0 ? (
          <div className="gemini-welcome">
            <div className="gemini-welcome-icon">
              <Sparkles size={36} />
            </div>
            
            <h2 className="gemini-welcome-title">
              Bem-vindo a {currentRegion}
            </h2>
            
            <p className="gemini-welcome-text">
              O que você deseja saber sobre {currentRegion} hoje?
            </p>

            <div className="gemini-prompts-grid">
              {prompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputMessage(prompt.text)}
                  className="gemini-prompt-card"
                >
                  <div className="prompt-icon">{prompt.icon}</div>
                  {prompt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="gemini-messages">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            
            {isLoading && (
              <div className="message-wrapper message-assistant">
                <div className="message-container">
                  <div className="message-icon">
                    <Sparkles size={20} />
                  </div>
                  <div className="message-content">
                    <div className="message-label">Giovanni Bot</div>
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <div className="gemini-input-wrapper">
        <div className="gemini-input-container">
          <div className="gemini-input-box">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={`Pergunte algo sobre ${currentRegion}...`}
              disabled={isLoading}
              className="gemini-textarea"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={`gemini-send-btn ${inputMessage.trim() ? 'active' : ''}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}