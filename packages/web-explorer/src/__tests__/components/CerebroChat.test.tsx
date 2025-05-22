import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CerebroChat } from '../../components/CerebroChat';
import { render } from '../utils';

describe('CerebroChat', () => {
  const mockOnMessage = vi.fn();

  beforeEach(() => {
    mockOnMessage.mockClear();
  });

  it('should render correctly', () => {
    render(<CerebroChat onMessage={mockOnMessage} theme="light" />);
    expect(screen.getByPlaceholderText('Digite sua mensagem...')).toBeInTheDocument();
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });

  it('should handle message submission', () => {
    render(<CerebroChat onMessage={mockOnMessage} theme="light" />);
    const input = screen.getByPlaceholderText('Digite sua mensagem...');
    const button = screen.getByText('Enviar');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(button);

    expect(mockOnMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'Test message',
        type: 'user'
      })
    );
    expect(input).toHaveValue('');
  });

  it('should not submit empty messages', () => {
    render(<CerebroChat onMessage={mockOnMessage} theme="light" />);
    const button = screen.getByText('Enviar');

    fireEvent.click(button);

    expect(mockOnMessage).not.toHaveBeenCalled();
  });

  it('should display message history', () => {
    const history = [
      {
        id: '1',
        content: 'Test message',
        type: 'user' as const,
        timestamp: new Date()
      }
    ];

    render(<CerebroChat onMessage={mockOnMessage} theme="light" history={history} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should render without crashing', () => {
    render(<CerebroChat />);
    expect(screen.getByPlaceholderText(/Digite sua mensagem/i)).toBeInTheDocument();
  });

  it('should handle message input', () => {
    render(<CerebroChat />);
    const input = screen.getByPlaceholderText(/Digite sua mensagem/i);

    fireEvent.change(input, { target: { value: 'Teste de mensagem' } });
    expect(input).toHaveValue('Teste de mensagem');
  });

  it('should handle message submission', () => {
    render(<CerebroChat />);
    const input = screen.getByPlaceholderText(/Digite sua mensagem/i);
    const sendButton = screen.getByTestId('send-message-button');

    fireEvent.change(input, { target: { value: 'Teste de mensagem' } });
    fireEvent.click(sendButton);

    expect(input).toHaveValue('');
    expect(screen.getByTestId('message-list')).toContainElement(
      screen.getByText('Teste de mensagem')
    );
  });
});
