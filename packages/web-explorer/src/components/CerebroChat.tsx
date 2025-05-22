import React, { useState, useRef, useEffect } from 'react';
import { CerebroChatProps, Message } from '../types';
import { useTheme } from '../hooks/useTheme';

export const CerebroChat: React.FC<CerebroChatProps> = ({
  onMessage,
  onOperation,
  theme,
  history = []
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(history);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentTheme } = useTheme(theme);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      type: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    onMessage?.(newMessage);
    setInput('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: currentTheme.background,
        color: currentTheme.text
      }}
    >
      <div
        data-testid="message-list"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {messages.map(message => (
          <div
            key={message.id}
            style={{
              alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              padding: '0.75rem 1rem',
              borderRadius: '1rem',
              backgroundColor:
                message.type === 'user'
                  ? currentTheme.primary
                  : currentTheme.secondary,
              color: currentTheme.text
            }}
          >
            <p style={{ margin: 0 }}>{message.content}</p>
            <small
              style={{
                display: 'block',
                marginTop: '0.5rem',
                opacity: 0.7,
                fontSize: '0.75rem'
              }}
            >
              {new Date(message.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: '1rem',
          borderTop: `1px solid ${currentTheme.secondary}`
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: currentTheme.secondary,
              color: currentTheme.text
            }}
          />
          <button
            type="submit"
            data-testid="send-message-button"
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: currentTheme.primary,
              color: currentTheme.text,
              cursor: 'pointer'
            }}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
