const User = require('mongoose').model('user');
const passport = require('passport');

module.exports.getUser = (req, res, next) => {
  User
    .findById(req.payload.id)
    .then(user => {
      if(!user) {return res.sendStatus(401)}
      return res.json({user: user.toAuthJSON()})
    })
    .catch(next);
}

module.exports.signUp = (req, res, next) => {
  const user = new User();
  if(typeof req.file !== 'undefined'){
    user.imageSrc = req.file.path;
  }

  if(typeof req.body.isAdmin !== 'undefined'){
    user.isAdmin = req.body.isAdmin;
  }
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user
    .save()
    .then(() => {
      return res.json({user: user.toAuthJSON()})
    })
    .catch(next);
}

module.exports.login = (req, res, next) => {
  if(!req.body.user.email){
    return res,status(422).json({errors: {error: "Email can't be blank"}});
  }
  if(!req.body.user.password){
    return res.status(422).json({errors: {error: "password can't be blank"}});
  }

  passport.authenticate('local', {session: false}, (err, user, info) => {
    if(err){return next(err)}
    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()})
    } else {
      return res.status(422).json(info)
    }
  })(req, res, next)
}