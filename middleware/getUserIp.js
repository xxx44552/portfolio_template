const userIp = async(req, res, next) => {
  res.cookie('ip', `${req}`);
  console.log(req.ip)
  next()
};

module.exports = userIp;
