#!/usr/bin/env node

"use strict";
var path = require("path");
var fs = require("fs");

var shell = require("shelljs");
var jsonfile = require('jsonfile')

shell.config.fatal = true;
module.exports = frontendDependencies;

if (require.main === module) frontendDependencies();

// main function
function frontendDependencies() {	

	try{
 		var  targets = jsonfile.readFileSync(path.join(process.cwd(), 'dep-copy.json'));
	} catch (err) {
		console.error("dep-copy.json file contains invalid JSON schema:\n");
		console.log(err);
		process.exit(1);
	}

  var srcPrefix = 'node_modules/', destPrefix;

  log("Copy all specified files");
	
	if (targets) {
		destPrefix = targets.options.destPrefix;
		delete targets.options;

		for( var i = 0; i < Object.keys( targets ).length; i++ ){
			var key = Object.keys(targets)[i];
			var data = targets[key];

			for( var j = 0; j < Object.keys( data ).length; j++ ){
				var values = Object.values(data)[j];

				for( var keySecond in values ){
					var srcFiles = values[keySecond];
					var destFiles = keySecond;

					srcFiles = srcPrefix + srcFiles;
					destFiles = destPrefix + destFiles;
					copyFiles(srcFiles, destFiles);
				}
			}
		}
	}
}

function copyFiles (srcFilesPath, destFilesPath){

   shell.mkdir("-p", destFilesPath);
   log("copy " + srcFilesPath + " to " + destFilesPath)
   shell.cp("-r", srcFilesPath, destFilesPath);
}

function log(message) {
   var green = '\x1b[32m';
   var black = '\x1b[0m';
   console.log(green, '[depcopy]: ' + message, black)
}
