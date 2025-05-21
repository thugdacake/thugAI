import { EventListener } from '../types';

const listeners: { [key: string]: EventListener[] } = {};

export function on(event: string, listener: EventListener): void {
  if (!listeners[event]) {
    listeners[event] = [];
  }
  listeners[event].push(listener);
}

export function emit(event: string, data: any): void {
  if (listeners[event]) {
    for (const listener of listeners[event]) {
      try {
        listener(data);
      } catch (error) {
        console.error(`Erro ao executar listener para evento ${event}:`, error);
      }
    }
  }
}

export function off(event: string, listener: EventListener): void {
  if (listeners[event]) {
    const index = listeners[event].indexOf(listener);
    if (index !== -1) {
      listeners[event].splice(index, 1);
    }
  }
}

export function clear(event?: string): void {
  if (event) {
    delete listeners[event];
  } else {
    Object.keys(listeners).forEach(key => {
      delete listeners[key];
    });
  }
} 