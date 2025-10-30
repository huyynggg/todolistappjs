function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke! Fix it!' });
  }
  
  module.exports = errorHandler;