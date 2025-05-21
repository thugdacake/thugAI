const { Operante } = require('@thugdacake/operante');
const User = require('./models/User');
const operante = new Operante();

async function initializeBlog() {
  try {
    // Inicializa o blog
    await operante.init({
      name: 'blog-virtual',
      template: 'blog',
      features: ['express', 'ejs', 'mongoose']
    });

    // Configura o banco de dados
    await operante.database.setup({
      type: 'mongodb',
      url: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-virtual'
    });

    // Cria usuário administrador
    const adminUser = await User.findOne({ email: 'admin@blog.com' });
    
    if (!adminUser) {
      await User.create({
        username: 'admin',
        email: 'admin@blog.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Usuário administrador criado com sucesso!');
    }

    // Cria posts iniciais
    const posts = [
      {
        title: 'Bem-vindo ao Blog Virtual',
        content: 'Este é o primeiro post do nosso blog virtual, gerenciado pelo Cérebro Operante.',
        excerpt: 'Uma introdução ao nosso blog virtual e suas funcionalidades.',
        author: 'Cérebro Operante',
        tags: ['introdução', 'blog', 'operante'],
        status: 'published'
      },
      {
        title: 'Como o Cérebro Operante Funciona',
        content: 'O Cérebro Operante é um framework CLI que visa comandar inteligências artificiais de forma modular.',
        excerpt: 'Aprenda sobre o funcionamento do Cérebro Operante e suas capacidades.',
        author: 'Cérebro Operante',
        tags: ['tutorial', 'operante', 'ia'],
        status: 'published'
      }
    ];

    for (const post of posts) {
      await operante.blog.createPost(post);
    }

    console.log('Blog Virtual inicializado com sucesso!');
    console.log('Posts criados:', posts.length);
    console.log('\nCredenciais do administrador:');
    console.log('Email: admin@blog.com');
    console.log('Senha: admin123');

  } catch (error) {
    console.error('Erro ao inicializar o blog:', error);
    process.exit(1);
  }
}

initializeBlog(); 