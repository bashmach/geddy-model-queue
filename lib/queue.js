/*!
 * queue
 * Copyright(c) 2014 Pavel Machekhin <pavel.machekhin@gmail.com>
 * MIT Licensed
 */

var exports = module.exports = Queue;

/*!
 * Library version.
 */

exports.version = require('../package.json').version;

var EventEmitter = require('events').EventEmitter
  , QueueStorage = require('./queue/storage')
  , model = require('model');

function Queue(options) {
  options = options || {};

  this.storage = new QueueStorage({
    location: options.location || null
    , filename: options.filename
  });
}

/**
 * Inherit from `EventEmitter.prototype`.
 */

Queue.prototype.__proto__ = EventEmitter.prototype;

Queue.prototype.createJob = function(data, callback) {
  var job = this.storage.model.create();
  job.title = data.title;
  job.priority = data.priority;
  job.settings = data.settings;
  job.save(function(err, data) {
    if (err) {
      throw err;
    }

    return callback(job);
  });
}

/**
 * List jobs with order by highest priority
 * @param title
 */
Queue.prototype.listJobs = function(query, options, callback) {
  this.storage.model.all(query, options, function (err, data) {
    if (err) {
      throw err;
    }

    return callback(data);
  });
}

Queue.prototype.processJob = function(jobId) {

}