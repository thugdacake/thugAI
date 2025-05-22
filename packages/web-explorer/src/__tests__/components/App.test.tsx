import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { App } from '../../App';
import { render } from '../utils';

describe('App', () => {
  it('should render correctly', () => {
    render(<App />);
    expect(screen.getByText('🌙 Modo Escuro')).toBeInTheDocument();
  });

  it('should toggle theme', () => {
    render(<App />);
    const themeButton = screen.getByText('🌙 Modo Escuro');

    fireEvent.click(themeButton);

    expect(screen.getByText('☀️ Modo Claro')).toBeInTheDocument();
  });

  it('should render all main components', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Digite sua mensagem...')).toBeInTheDocument();
    expect(screen.getByText('Processar Ideia')).toBeInTheDocument();
    expect(screen.getByText('Core')).toBeInTheDocument();
    expect(screen.getByText('Teste Unitário')).toBeInTheDocument();
  });

  it('should handle message submission', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Digite sua mensagem...');
    const button = screen.getByText('Enviar');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(button);

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should handle operation selection', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<App />);
    const operation = screen.getByTestId('operation-item-1');

    fireEvent.click(operation);

    expect(consoleSpy).toHaveBeenCalledWith('Operação selecionada:', expect.any(Object));
  });

  it('should handle library selection', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<App />);
    const library = screen.getByTestId('library-item-1');

    fireEvent.click(library);

    expect(consoleSpy).toHaveBeenCalledWith('Biblioteca selecionada:', expect.any(String));
  });

  it('should handle test run', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<App />);
    const runButton = screen.getByTestId('run-test-button-1');

    fireEvent.click(runButton);

    expect(consoleSpy).toHaveBeenCalledWith('Teste executado:', expect.any(String));

    await waitFor(() => {
      expect(screen.getByText('Resultados')).toBeInTheDocument();
    });
  });
});
