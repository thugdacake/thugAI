const express = require('express');
const { Operante } = require('@thugdacake/operante');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();
const operante = new Operante();

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuração da sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'chave-secreta-temporaria',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-virtual'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

// Configuração do Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// Middleware para variáveis globais
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Rotas públicas
app.get('/', async (req, res) => {
  try {
    const posts = await operante.blog.getPosts();
    res.render('index', { posts });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

app.get('/post/:id', async (req, res) => {
  try {
    const post = await operante.blog.getPost(req.params.id);
    res.render('post', { post });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

app.post('/post/:id/comment', async (req, res) => {
  try {
    await operante.blog.addComment(req.params.id, req.body);
    res.redirect(`/post/${req.params.id}`);
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

// Rotas de autenticação
app.get('/login', (req, res) => {
  res.render('auth/login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Você foi desconectado');
  res.redirect('/');
});

// Rotas administrativas
app.get('/admin', isAuthenticated, async (req, res) => {
  try {
    const posts = await operante.blog.getPosts();
    res.render('admin/dashboard', { posts });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

app.get('/admin/posts/new', isAuthor, (req, res) => {
  res.render('admin/posts/new');
});

app.post('/admin/posts', isAuthor, async (req, res) => {
  try {
    await operante.blog.createPost({
      ...req.body,
      author: req.user._id
    });
    req.flash('success', 'Post criado com sucesso');
    res.redirect('/admin');
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

app.get('/admin/posts/:id/edit', isAuthor, async (req, res) => {
  try {
    const post = await operante.blog.getPost(req.params.id);
    res.render('admin/posts/edit', { post });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

app.put('/admin/posts/:id', isAuthor, async (req, res) => {
  try {
    await operante.blog.updatePost(req.params.id, req.body);
    req.flash('success', 'Post atualizado com sucesso');
    res.redirect('/admin');
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

app.delete('/admin/posts/:id', isAuthor, async (req, res) => {
  try {
    await operante.blog.deletePost(req.params.id);
    req.flash('success', 'Post excluído com sucesso');
    res.redirect('/admin');
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

// Inicialização
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blog Virtual rodando na porta ${PORT}`);
}); 