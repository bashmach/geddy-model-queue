var model = require('model')
  , fs = require('fs')
  , os = require('os')
  , crypto = require('crypto')

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

var QueueStorage = function (options) {
  this.setLocation(options.location);
  this.setFilename(options.filename || 'queue.json');

  this.setModel();
};

QueueStorage.prototype.setModel = function() {
  var self = this
    , name = crypto.createHash('md5')
      .update(this.getLocation() + this.getFilename())
      .digest('hex');

  var ModelCtor = function() {
    this.property('title', 'string');
    this.property('priority', 'int');
    this.property('settings', 'object');

    this.setAdapter('filesystem', {
      location: self.getLocation(),
      filename: self.getFilename()
    });
  }

  model.registerDefinitions([{
    ctorName: name
    , ctor: ModelCtor
  }]);

  this.model = model[name];
}

QueueStorage.prototype.getModel = function() {
  return this.model;
}

QueueStorage.prototype.setLocation = function(path) {
  this.location = _getLocation(path);
}

QueueStorage.prototype.getLocation = function() {
  return this.location;
}

QueueStorage.prototype.setFilename = function(filename) {
  this.filename = filename;
}

QueueStorage.prototype.getFilename = function() {
  return this.filename;
}

module.exports = QueueStorage;
