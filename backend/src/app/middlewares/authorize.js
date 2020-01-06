export default (profiles) => {

  return function(req, res, next) {
    console.log(req.profile);
    if (profiles.some(profile => req.profile === profile)) {
      next();
    } else {
      return res.status(400).send({ errors: ['Permission denied'] });
    }
  }
};



