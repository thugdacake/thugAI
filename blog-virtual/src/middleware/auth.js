const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Por favor, faça login para acessar esta página');
  res.redirect('/login');
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  req.flash('error', 'Acesso negado. Você precisa ser um administrador');
  res.redirect('/');
};

const isAuthor = (req, res, next) => {
  if (req.isAuthenticated() && (req.user.role === 'admin' || req.user.role === 'author')) {
    return next();
  }
  req.flash('error', 'Acesso negado. Você precisa ser um autor');
  res.redirect('/');
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isAuthor
}; 