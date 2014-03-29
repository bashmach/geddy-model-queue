var assert = require("chai").assert
  , fs = require("fs")
  , Queue = require("../../lib/queue")

suite('Queue', function(){

  var tmpTestDataPath = __dirname + '/../data'
    , fixtureDataPath = __dirname + '/../fixtures'
    , queue;

  setup(function() {

  });

  teardown(function() {
    fs.readdir(tmpTestDataPath, function(err, files) {
      files.forEach(function(file, key) {
        fs.unlink(tmpTestDataPath + '/' + file);
      });
    })
  });

  suite("#createJob()", function() {
    var queue = new Queue({
      location: tmpTestDataPath
    });

    test("should create new job", function() {
      var data = {
        title: 'Job #N'
        , priority: 0
        , settings: {
          foo: 'bar'
        }
      }

      queue.createJob(data, function(job) {
        assert.equal(data.title, job.title);
      });
    });
  });

});