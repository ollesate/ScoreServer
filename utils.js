var fs = require('fs');

export default {
  fileExists: function(filePath)
  {
    try
    {
      return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
      return false;
    }
  },
  removeLastComma: function(str) {
    return str.replace(/,(\s+)?$/, '');
  }
};
