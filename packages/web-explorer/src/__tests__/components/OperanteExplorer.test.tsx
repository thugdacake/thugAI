import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OperanteExplorer } from '../../components/OperanteExplorer';
import { render } from '../utils';

describe('OperanteExplorer', () => {
  it('should render correctly', () => {
    render(<OperanteExplorer />);
    expect(screen.getByText('Processar Ideia')).toBeInTheDocument();
    expect(screen.getByText('Gerar Documentação')).toBeInTheDocument();
    expect(screen.getByText('Criar Prompt')).toBeInTheDocument();
    expect(screen.getByText('Executar Comando')).toBeInTheDocument();
  });

  it('should handle operation click', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<OperanteExplorer />);
    const operation = screen.getByTestId('operation-item-1');

    fireEvent.click(operation);

    expect(consoleSpy).toHaveBeenCalledWith('Operação selecionada:', expect.any(Object));
  });

  it('should highlight selected operation', () => {
    render(<OperanteExplorer />);
    const operation = screen.getByTestId('operation-item-1');

    fireEvent.click(operation);

    expect(operation).toHaveClass('selected');
  });
});
