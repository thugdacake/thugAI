import React, { useState } from 'react';
import { OperanteExplorerProps, Operation } from '../types';
import { useTheme } from '../hooks/useTheme';

const defaultOperations: Operation[] = [
  {
    id: '1',
    name: 'Processar Ideia',
    description: 'Processa uma ideia usando o Cérebro Operante',
    mode: 'blueprint'
  },
  {
    id: '2',
    name: 'Gerar Documentação',
    description: 'Gera documentação para um código',
    mode: 'documentation'
  },
  {
    id: '3',
    name: 'Criar Prompt',
    description: 'Cria um prompt para o Cérebro Operante',
    mode: 'prompt'
  },
  {
    id: '4',
    name: 'Executar Comando',
    description: 'Executa um comando no Cérebro Operante',
    mode: 'command'
  }
];

export const OperanteExplorer: React.FC<OperanteExplorerProps> = ({
  onOperation,
  theme
}) => {
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
  const { currentTheme } = useTheme(theme);

  const handleOperationClick = (operation: Operation) => {
    setSelectedOperation(operation.id);
    onOperation?.(operation);
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
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}
      >
        {defaultOperations.map(operation => (
          <div
            key={operation.id}
            data-testid={`operation-item-${operation.id}`}
            className={selectedOperation === operation.id ? 'selected' : ''}
            onClick={() => handleOperationClick(operation)}
            style={{
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: selectedOperation === operation.id ? currentTheme.primary : currentTheme.secondary,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              {operation.name}
            </h3>
            <p
              style={{
                margin: '0.5rem 0 0',
                fontSize: '0.9rem',
                opacity: 0.8
              }}
            >
              {operation.description}
            </p>
            <code
              style={{
                display: 'block',
                margin: '0.5rem 0 0',
                fontSize: '0.8rem',
                opacity: 0.6
              }}
            >
              {operation.mode}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};
