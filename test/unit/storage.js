var assert = require('chai').assert
  , fs = require("fs")
  , os = require("os")
  , QueueStorage = require("../../lib/queue/storage")

suite('Queue Storage', function () {
  suite('#setLocation()', function () {
    test('should set temporary directory when path from param is not exists or not writeable', function () {
      var storage = new QueueStorage({
        location: __dirname + '/notExistsDirectory'
      });

      assert.equal(os.tmpdir(), storage.getLocation());
    });

    test('should set temporary directory when path is not writeable', function () {
      var storage
        , path = '/bin';

      storage = new QueueStorage({
        location: path
      })

      assert.equal(os.tmpdir(), storage.getLocation());
    })

    test('should set path from argument value when it is exists and writeable', function () {
      var storage
        , path = __dirname + '/../data';

      storage = new QueueStorage({
        location: path
      })

      assert.equal(fs.realpathSync(path), storage.getLocation());
    });
  });
});