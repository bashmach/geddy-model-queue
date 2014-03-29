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

function Queue(options) {
  options = options || {};
}

/**
 * Inherit from `EventEmitter.prototype`.
 */

Queue.prototype.__proto__ = EventEmitter.prototype;

Queue.prototype.createJob = function() {

}

Queue.prototype.listJobs = function() {

}

Queue.prototype.processJob = function(jobId) {

}