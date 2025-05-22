import { http, HttpResponse } from 'msw'

interface Params {
  id: string
}

export const handlers = [
  http.get('/api/operations', () => {
    return HttpResponse.json([
      {
        id: '1',
        name: 'Processar Ideia',
        description: 'Processa uma ideia usando o Cérebro Operante',
        mode: 'blueprint'
      }
    ])
  }),

  http.post('/api/operations', () => {
    return HttpResponse.json({
      id: '2',
      name: 'Nova Operação',
      description: 'Descrição da nova operação',
      mode: 'blueprint'
    }, { status: 201 })
  }),

  http.get('/api/operations/:id', ({ params }: { params: Params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Operação Específica',
      description: 'Descrição da operação específica',
      mode: 'blueprint'
    })
  }),

  http.put('/api/operations/:id', () => {
    return HttpResponse.json({
      id: '1',
      name: 'Operação Atualizada',
      description: 'Descrição atualizada',
      mode: 'blueprint'
    })
  }),

  http.delete('/api/operations/:id', () => {
    return new HttpResponse(null, { status: 204 })
  })
]
