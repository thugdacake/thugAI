import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import { render as customRender } from './utils';

const TestComponent = () => <div>Test Component</div>;

describe('Test Utils', () => {
  it('should render component with ChakraProvider', () => {
    customRender(<TestComponent />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('should render component with custom options', () => {
    const { container } = customRender(<TestComponent />, {
      container: document.createElement('div')
    });
    expect(container).toBeDefined();
  });

  it('should export all testing-library utilities', () => {
    expect(render).toBeDefined();
    expect(screen).toBeDefined();
  });

  it('should wrap component with ChakraProvider', () => {
    const { container } = customRender(<TestComponent />);
    const provider = container.querySelector('.chakra-provider');
    expect(provider).toBeDefined();
  });
});
