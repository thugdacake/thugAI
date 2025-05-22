import { describe, it, expect } from 'vitest'
import { setupWorker } from 'msw/browser'
import { handlers } from '../mocks/handlers'

// Este teste só deve rodar em ambiente de browser
describe.skip('MSW Browser Worker', () => {
  it('should be defined', () => {
    const worker = setupWorker(...handlers)
    expect(worker).toBeDefined()
  })

  it('should have all handlers registered', () => {
    const worker = setupWorker(...handlers)
    expect(worker).toBeDefined()
    // Verificar se todos os handlers estão registrados
    expect(handlers).toHaveLength(5)
  })
})
