import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestPanel } from '../../components/TestPanel';
import { render } from '../utils';

describe('TestPanel', () => {
  const mockOnRun = vi.fn();

  beforeEach(() => {
    mockOnRun.mockClear();
  });

  it('should render correctly', () => {
    render(<TestPanel onRun={mockOnRun} theme="light" />);
    expect(screen.getByTestId('test-name-1')).toHaveTextContent('Teste Unitário');
    expect(screen.getByTestId('test-name-2')).toHaveTextContent('Teste de Integração');
    expect(screen.getByTestId('test-name-3')).toHaveTextContent('Teste End-to-End');
  });

  it('should handle test click', () => {
    render(<TestPanel onRun={mockOnRun} theme="light" />);
    const test = screen.getByTestId('test-item-1');

    fireEvent.click(test);

    expect(mockOnRun).toHaveBeenCalledWith('1');
  });

  it('should highlight selected test', () => {
    render(<TestPanel onRun={mockOnRun} theme="light" />);
    const test = screen.getByTestId('test-item-1');

    fireEvent.click(test);

    expect(test).toHaveClass('selected');
  });

  it('should display test status', () => {
    render(<TestPanel onRun={mockOnRun} theme="light" />);
    expect(screen.getByTestId('test-status-1')).toHaveTextContent('pending');
    expect(screen.getByTestId('test-status-2')).toHaveTextContent('pending');
    expect(screen.getByTestId('test-status-3')).toHaveTextContent('pending');
  });

  it('should display test descriptions', () => {
    render(<TestPanel onRun={mockOnRun} theme="light" />);
    expect(screen.getByTestId('test-description-1')).toHaveTextContent('Testa uma unidade de código');
    expect(screen.getByTestId('test-description-2')).toHaveTextContent('Testa a integração entre componentes');
    expect(screen.getByTestId('test-description-3')).toHaveTextContent('Testa o fluxo completo da aplicação');
  });

  it('should render without crashing', () => {
    render(<TestPanel />);
    expect(screen.getByTestId('test-panel')).toBeInTheDocument();
  });

  it('should handle test selection', () => {
    render(<TestPanel />);
    const test = screen.getByTestId('test-item-1');

    fireEvent.click(test);
    expect(test).toHaveClass('selected');
  });

  it('should handle test execution', () => {
    render(<TestPanel />);
    const test = screen.getByTestId('test-item-1');
    const runButton = screen.getByTestId('run-test-button-1');

    fireEvent.click(test);
    fireEvent.click(runButton);

    const status = screen.getByTestId('test-status-1');
    expect(status).toHaveTextContent('running');
  });

  it('should display test results', () => {
    render(<TestPanel />);
    const test = screen.getByTestId('test-item-1');
    const runButton = screen.getByTestId('run-test-button-1');

    fireEvent.click(test);
    fireEvent.click(runButton);

    const results = screen.getByTestId('test-results');
    expect(results).toBeInTheDocument();
  });
});
