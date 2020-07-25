const userIp = async(req, res, next) => {
  res.cookie('ip', req);
  next()
};

module.exports = userIp;
