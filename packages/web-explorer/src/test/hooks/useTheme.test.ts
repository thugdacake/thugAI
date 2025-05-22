import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTheme } from '../../hooks/useTheme';

describe('useTheme', () => {
  it('should return light theme by default', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.currentTheme).toEqual({
      background: '#ffffff',
      text: '#1a1a1a',
      primary: '#3182ce',
      secondary: '#e2e8f0'
    });
  });

  it('should return light theme when light is specified', () => {
    const { result } = renderHook(() => useTheme('light'));
    expect(result.current.currentTheme).toEqual({
      background: '#ffffff',
      text: '#1a1a1a',
      primary: '#3182ce',
      secondary: '#e2e8f0'
    });
  });

  it('should return dark theme when dark is specified', () => {
    const { result } = renderHook(() => useTheme('dark'));
    expect(result.current.currentTheme).toEqual({
      background: '#1a1a1a',
      text: '#ffffff',
      primary: '#4299e1',
      secondary: '#2d3748'
    });
  });
});
