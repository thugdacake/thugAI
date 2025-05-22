import React, { useState } from 'react';
import { TestPanelProps, Test } from '../types';
import { useTheme } from '../hooks/useTheme';

const defaultTests: Test[] = [
  {
    id: '1',
    name: 'Teste Unitário',
    description: 'Testa uma unidade de código',
    type: 'unit',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Teste de Integração',
    description: 'Testa a integração entre componentes',
    type: 'integration',
    status: 'pending'
  },
  {
    id: '3',
    name: 'Teste End-to-End',
    description: 'Testa o fluxo completo da aplicação',
    type: 'e2e',
    status: 'pending'
  }
];

export const TestPanel: React.FC<TestPanelProps> = ({ onRun, theme }) => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [tests, setTests] = useState<Test[]>(defaultTests);
  const { currentTheme } = useTheme(theme);

  const handleTestClick = (test: Test) => {
    setSelectedTest(test.id);
    onRun?.(test.id);
  };

  const handleRun = (testId: string) => {
    setTests(prev =>
      prev.map(test =>
        test.id === testId
          ? { ...test, status: 'running', result: undefined }
          : test
      )
    );
    onRun?.(testId);
    setTimeout(() => {
      setTests(prev =>
        prev.map(test =>
          test.id === testId
            ? { ...test, status: 'passed', result: { mensagem: 'Resultados' } }
            : test
        )
      );
    }, 100);
  };

  const getStatusColor = (status: Test['status']) => {
    switch (status) {
      case 'passed':
        return '#48bb78';
      case 'failed':
        return '#f56565';
      case 'running':
        return '#4299e1';
      default:
        return currentTheme.secondary;
    }
  };

  return (
    <div
      className="test-panel"
      data-testid="test-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: currentTheme.background,
        color: currentTheme.text
      }}
    >
      <div
        className="tests-list"
        data-testid="tests-list"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}
      >
        {tests.map(test => (
          <div
            key={test.id}
            className={`test-item ${selectedTest === test.id ? 'selected' : ''}`}
            data-testid={`test-item-${test.id}`}
            onClick={() => handleTestClick(test)}
            style={{
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor:
                selectedTest === test.id
                  ? currentTheme.primary
                  : currentTheme.secondary,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            <div
              className="test-header"
              data-testid={`test-header-${test.id}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h3
                className="test-name"
                data-testid={`test-name-${test.id}`}
                style={{
                  margin: 0,
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                {test.name}
              </h3>
              <span
                className="test-status"
                data-testid={`test-status-${test.id}`}
                style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  backgroundColor: getStatusColor(test.status),
                  fontSize: '0.8rem',
                  textTransform: 'uppercase'
                }}
              >
                {test.status}
              </span>
            </div>
            <p
              className="test-description"
              data-testid={`test-description-${test.id}`}
              style={{
                margin: '0.5rem 0 0',
                fontSize: '0.9rem',
                opacity: 0.8
              }}
            >
              {test.description}
            </p>
            <code
              className="test-type"
              data-testid={`test-type-${test.id}`}
              style={{
                display: 'block',
                margin: '0.5rem 0 0',
                fontSize: '0.8rem',
                opacity: 0.6
              }}
            >
              {test.type}
            </code>
            <button
              data-testid={`run-test-button-${test.id}`}
              onClick={e => {
                e.stopPropagation();
                handleRun(test.id);
              }}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                backgroundColor: currentTheme.primary,
                color: currentTheme.text,
                cursor: 'pointer'
              }}
            >
              Executar
            </button>
            {selectedTest === test.id && test.result && (
              <div
                data-testid="test-results"
                style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  backgroundColor: currentTheme.secondary
                }}
              >
                <strong>Resultados</strong>
                <pre style={{ margin: 0, fontSize: '0.8rem' }}>
                  {JSON.stringify(test.result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
