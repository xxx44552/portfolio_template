const userIp = async(req, res, next) => {
  res.cookie('ip', req.connection.remoteAddress);
  next()
};

module.exports = userIp;
