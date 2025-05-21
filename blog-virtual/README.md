# Blog Virtual

Um blog moderno gerenciado pelo Cérebro Operante.

## Requisitos

- Node.js 14.x ou superior
- MongoDB 4.x ou superior
- NPM ou Yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/blog-virtual.git
cd blog-virtual
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do Servidor
PORT=3000

# Configurações do MongoDB
MONGODB_URI=mongodb://localhost:27017/blog-virtual

# Configurações de Sessão
SESSION_SECRET=sua-chave-secreta-aqui

# Configurações do Cérebro Operante
OPERANTE_API_KEY=sua-chave-api-aqui
OPERANTE_ENV=development
```

4. Inicialize o banco de dados:
```bash
node src/operante-init.js
```

5. Inicie o servidor:
```bash
npm start
```

O blog estará disponível em `http://localhost:3000`.

## Funcionalidades

- Sistema de autenticação
- Área administrativa
- Gerenciamento de posts
- Sistema de comentários
- Tags e categorias
- Interface responsiva
- Integração com Cérebro Operante

## Estrutura do Projeto

```
blog-virtual/
├── src/
│   ├── config/
│   │   ├── passport.js
│   │   └── .env
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── public/
│   │   └── css/
│   │       └── style.css
│   ├── views/
│   │   ├── admin/
│   │   │   └── dashboard.ejs
│   │   ├── auth/
│   │   │   └── login.ejs
│   │   ├── index.ejs
│   │   └── post.ejs
│   ├── index.js
│   └── operante-init.js
├── .env
├── package.json
└── README.md
```

## Scripts Disponíveis

- `npm start`: Inicia o servidor
- `npm run dev`: Inicia o servidor em modo de desenvolvimento
- `npm test`: Executa os testes
- `npm run operante`: Executa comandos do Cérebro Operante

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes. 