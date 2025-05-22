import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LibraryExplorer } from '../../components/LibraryExplorer';
import { render } from '../utils';

describe('LibraryExplorer', () => {
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('should render correctly', () => {
    render(<LibraryExplorer onSelect={mockOnSelect} theme="light" />);
    expect(screen.getByTestId('library-name-1')).toHaveTextContent('Core');
    expect(screen.getByTestId('library-name-2')).toHaveTextContent('Web Explorer');
    expect(screen.getByTestId('library-name-3')).toHaveTextContent('CLI');
  });

  it('should handle library click', () => {
    render(<LibraryExplorer onSelect={mockOnSelect} theme="light" />);
    const library = screen.getByTestId('library-item-1');

    fireEvent.click(library);

    expect(mockOnSelect).toHaveBeenCalledWith('/packages/core');
  });

  it('should highlight selected library', () => {
    render(<LibraryExplorer onSelect={mockOnSelect} theme="light" />);
    const library = screen.getByTestId('library-item-1');

    fireEvent.click(library);

    expect(library).toHaveClass('selected');
  });

  it('should display library descriptions', () => {
    render(<LibraryExplorer onSelect={mockOnSelect} theme="light" />);
    expect(screen.getByTestId('library-description-1')).toHaveTextContent('Biblioteca principal do Cérebro Operante');
    expect(screen.getByTestId('library-description-2')).toHaveTextContent('Interface web para o Cérebro Operante');
    expect(screen.getByTestId('library-description-3')).toHaveTextContent('Interface de linha de comando');
  });
});
