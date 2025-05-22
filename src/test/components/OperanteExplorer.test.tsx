import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OperanteExplorer } from '../../components/OperanteExplorer';
import { render } from '../utils';

describe('OperanteExplorer', () => {
  const mockOnOperation = vi.fn();

  beforeEach(() => {
    mockOnOperation.mockClear();
  });

  it('should render correctly', () => {
    render(<OperanteExplorer onOperation={mockOnOperation} theme="light" />);
    expect(screen.getByTestId('operation-name-1')).toHaveTextContent('Processar Ideia');
    // Adicione outros expects conforme necessário
  });

  it('should handle operation click', () => {
    render(<OperanteExplorer onOperation={mockOnOperation} theme="light" />);
    const operation = screen.getByTestId('operation-item-1');
    fireEvent.click(operation);
    expect(mockOnOperation).toHaveBeenCalledWith({
      id: '1',
      name: 'Processar Ideia',
      description: 'Processa uma ideia usando o Cérebro Operante',
      mode: 'blueprint',
    });
  });

  it('should highlight selected operation', () => {
    render(<OperanteExplorer onOperation={mockOnOperation} theme="light" />);
    const operation = screen.getByTestId('operation-item-1');
    fireEvent.click(operation);
    expect(operation).toHaveClass('selected');
  });
});
