var model = require('model')
  , fs = require('fs')
  , os = require('os');

/**
 * Returns system temporary directory if path is not exists or not writable
 *
 * @param path
 * @returns {*}
 * @private
 */
function _getLocation(path) {
  if (fs.existsSync(path)) {
    path = fs.realpathSync(path);

    var lstat = fs.statSync(path)
      , owner = process.uid = lstat.uid
      , inGroup = process.gid = lstat.gid;

    // directory is writable
    if (owner && (lstat.mode & 00200) || // User is owner and owner can write.
      inGroup && (lstat.mode & 00020) || // User is in group and group can write.
      (lstat.mode & 00002)) {
      return path;
    }
  }

  return os.tmpdir();
}

var QueueStorage = function (options, data) {
  options = options || {};

  this.location = null;

  this.setLocation = function(location) {
    this.location = _getLocation(location);
  }

  this.property('title', 'string');
  this.property('priority', 'int');
  this.property('settings', 'object');

  this.setLocation(options.location || __dirname + '/data');

  this.setAdapter('filesystem', {
    location: this.location,
    filename: 'queue.json'
  });
};

QueueStorage.prototype.getLocation = function() {
  return this.location;
}

model.registerDefinitions([{
  ctorName: 'QueueStorage'
  , ctor: QueueStorage
}]);

module.exports = model.QueueStorage;
