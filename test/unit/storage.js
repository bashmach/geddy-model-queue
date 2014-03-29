var assert = require('chai').assert
  , fs = require("fs")
  , os = require("os")
  , QueueStorage = require("../../lib/queue/storage")

suite('Queue Storage', function () {
  suite('#setLocation()', function () {
    test('should set temporary directory when path from param is not exists or not writeable', function () {
      var storage = QueueStorage.create();

      storage.setLocation(__dirname + '/notExistsDirectory');

      assert.equal(os.tmpdir(), storage.getLocation());
    });

    test('should set temporary directory when path is not writeable', function () {
      var storage = QueueStorage.create()
        , path = '/bin';

      storage.setLocation(path);

      assert.equal(os.tmpdir(), storage.getLocation());
    })

    test('should set path from argument value when it is exists and writeable', function () {
      var storage = QueueStorage.create()
        , path = __dirname + '/../data';

      storage.setLocation(path);

      assert.equal(fs.realpathSync(path), storage.getLocation());
    });
  });
});