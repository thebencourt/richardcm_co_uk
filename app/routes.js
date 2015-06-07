module.exports = function (app, passport, Item) {

  /**
   * Public pages
   */

  // Homepage
  app.get('/', function (req, res) {
    var items = Item.find().limit(1);
    items.select('slug banner title');
    items.exec(function (err, items) {
      if (err) {
        res.send(err);
      }
      res.render('index', {items: items});
    });
  });

  // About
  app.get('/about', function (req, res) {
    res.render('about');
  });

  // Portfolio listing page
  app.get('/portfolio', function (req, res) {
    var items = Item.find();
    items.select('slug banner title');
    items.exec(function (err, items) {
      if (err) {
        res.send(err);
      }
      res.render('list', {items: items});
    });
  });

  // Single portfolio item
  app.get('/portfolio/:slug', function (req, res) {
    Item.findOne({'slug': req.params.slug}, function (err, item) {
      if (err) {
        res.send(err);
      }
      res.render('detail', {item: item});
    });
  });


  app.get('/sitemap', function (req, res) {
    var items = Item.find();
    var domain = 'http://richardcm.co.uk';
    items.select('slug updated_at');
    items.exec(function (err, items) {
      if (err) {
        res.send(err);
      }
      res.set('Content-Type', 'application/xml');
      res.render('sitemap', {domain: domain, items: items});
    });
  });

  // app.get('/register', function (req, res) {
    // res.render('admin/register', {message: ''});
  // });

  // Process registration form
  app.post('/register', passport.authenticate('local-register', {
    successRedirect: '/admin',
    failureRedirect: '/register',
    failureFlash: true
  }));

  // Admin login
  app.get('/login', function (req, res) {
    res.render('admin/login', {message: req.flash('loginMessage')});
  });

  // Process login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // Logout
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // Admin Dashboard
  app.get('/admin', isLoggedIn, function (req, res) {
    var items = Item.find();
    items.select('id slug title category')
    items.exec(function (err, items) {
      if (err) {
        res.send(err);
      }
      res.render('admin/list', {items: items, user: req.user, message: ''});
    });
  });

  // Add new item
  app.get('/admin/add', isLoggedIn, function (req, res) {
    res.render('admin/add', {user: req.user, message: ''});
  });

  // Process new item
  app.post('/admin', function (req, res) {

    var item = new Item();

    item.title = req.body.title;
    item.category = req.body.category;
    item.banner = req.body.banner;
    item.skills = req.body.skills;
    item.images = req.body.images;
    item.description = req.body.description;

    item.save(function (err) {
      if (err) {
        res.send(err);
      }

      Item.find(function (err, items) {
        if (err) {
          res.send(err);
        }
        res.render('admin/list', {items: items, message: 'Item added', message_type: 'success'});
      });
    });
  });

  // Admin item details
  app.get('/admin/:id', isLoggedIn, function (req, res) {
    Item.findById(req.params.id, function (err, item) {
      if (err) {
        res.send(err);
      }
      res.render('admin/detail', {item: item, user: req.user, message: ''});
    });
  });

  // Edit item
  app.get('/admin/:id/edit', isLoggedIn, function (req, res) {
    Item.findById(req.params.id, function (err, item) {
      if (err) {
        res.send(err);
      }
      res.render('admin/edit', {item: item, user: req.user, message: ''});
    });
  });

  // Process edited item
  app.post('/admin/:id', function (req, res) {
    Item.findById(req.params.id, function (err, item) {
      if (err) {
        res.send(err);
      }

      item.title = req.body.title;
      item.category = req.body.category;
      item.banner = req.body.banner;
      item.skills = req.body.skills;
      item.images = req.body.images;
      item.description = req.body.description;

      item.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.render('admin/detail', {item: item, message: 'Item updated', message_type: 'success'});
      });
    });
  });

  // Delete item
  app.get('/admin/:id/delete', isLoggedIn, function (req, res) {
    Item.remove({_id: req.params.id}, function (err, item) {
      if (err) {
        res.send(err);
      }

      Item.find(function (err, items) {
        if (err) {
          res.send(err);
        }
        res.render('admin/list', {items: items, user: req.user, message: 'Item deleted', message_type: 'success'});
      });
    });
  });
};

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
