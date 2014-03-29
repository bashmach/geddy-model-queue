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

  suite("#listJobs()", function() {
    var queue = new Queue({
      location: fixtureDataPath
      , filename: "list-jobs.json"
    });

    test("should list jobs with order by highest priority", function() {
      queue.listJobs(
      {}
      , {
        sort: {
          priority: 'desc'
        }
      }
      , function(jobs) {

        assert.isArray(jobs);
        assert.lengthOf(jobs, 3);
        assert.equal(jobs.shift().priority, 5);
      });
    })
  });
});