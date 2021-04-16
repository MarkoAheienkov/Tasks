const errorHadnler = (err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  }
  if (!err.message) {
    err.message = 'Error was occured';
  }
  return res.status(err.status).json({
    message: err.message,
  });
};

module.exports = errorHadnler;
