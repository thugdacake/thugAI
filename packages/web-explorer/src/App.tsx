import React, { useState, useEffect } from 'react';
import { CerebroChat } from './components/CerebroChat';
import { OperanteExplorer } from './components/OperanteExplorer';
import { LibraryExplorer } from './components/LibraryExplorer';
import { TestPanel } from './components/TestPanel';
import { Message, Operation } from './types';
import { useTheme } from './hooks/useTheme';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [messages, setMessages] = useState<Message[]>([]);
  const { currentTheme } = useTheme(theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleOperation = (operation: Operation) => {
    console.log('Operação selecionada:', operation);
  };

  const handleLibrarySelect = (path: string) => {
    console.log('Biblioteca selecionada:', path);
  };

  const handleTestRun = (test: string) => {
    console.log('Teste executado:', test);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr 300px',
        gridTemplateRows: 'auto 1fr 300px',
        gap: '1rem',
        padding: '1rem',
        height: '100vh',
        backgroundColor: currentTheme.background,
        color: currentTheme.text
      }}
    >
      <div
        style={{
          gridColumn: '1 / span 3',
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0.5rem'
        }}
      >
        <button
          onClick={toggleTheme}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            backgroundColor: currentTheme.primary,
            color: currentTheme.text,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
        </button>
      </div>

      <div
        style={{
          gridColumn: '1',
          gridRow: '2 / span 2',
          backgroundColor: currentTheme.secondary,
          borderRadius: '0.5rem',
          overflow: 'hidden'
        }}
      >
        <LibraryExplorer
          onSelect={handleLibrarySelect}
          theme={theme}
        />
      </div>

      <div
        style={{
          gridColumn: '2',
          gridRow: '2',
          backgroundColor: currentTheme.secondary,
          borderRadius: '0.5rem',
          overflow: 'hidden'
        }}
      >
        <CerebroChat
          onMessage={handleMessage}
          theme={theme}
          history={messages}
        />
      </div>

      <div
        style={{
          gridColumn: '3',
          gridRow: '2',
          backgroundColor: currentTheme.secondary,
          borderRadius: '0.5rem',
          overflow: 'hidden'
        }}
      >
        <OperanteExplorer
          onOperation={handleOperation}
          theme={theme}
        />
      </div>

      <div
        style={{
          gridColumn: '2 / span 2',
          gridRow: '3',
          backgroundColor: currentTheme.secondary,
          borderRadius: '0.5rem',
          overflow: 'hidden'
        }}
      >
        <TestPanel
          onRun={handleTestRun}
          theme={theme}
        />
      </div>
    </div>
  );
};
