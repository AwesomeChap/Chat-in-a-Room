var  isStr = function (str) {
      return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isStr};

