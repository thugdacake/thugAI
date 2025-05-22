import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/operations', () => {
    return HttpResponse.json([
      {
        id: '1',
        name: 'Processar Ideia',
        description: 'Processa uma ideia usando o Cérebro Operante',
        mode: 'sync',
      },
    ]);
  }),

  http.post('/api/operations', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      {
        id: '2',
        ...body,
        mode: 'sync',
      },
      { status: 201 }
    );
  }),

  http.get('/api/operations/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Processar Ideia',
      description: 'Processa uma ideia usando o Cérebro Operante',
      mode: 'sync',
    });
  }),

  http.put('/api/operations/:id', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: '1',
      ...body,
      mode: 'sync',
    });
  }),

  http.delete('/api/operations/:id', () => {
    return new HttpResponse(null, { status: 204 });
  })
];
