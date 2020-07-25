const userIp = async(req, res, next) => {
  res.cookie('ip', req.ip);
  next()
};

module.exports = userIp;
