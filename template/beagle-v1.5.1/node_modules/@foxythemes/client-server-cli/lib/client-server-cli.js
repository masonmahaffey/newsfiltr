#!/usr/bin/env node

"use strict";

var express = require('express')
  , fs = require('fs')
  , path = require('path')
  , htmlRegex = /\.html$/
  , opn = require('opn');

// Include extrernal libs
const commandLineArgs = require( 'command-line-args' );

// Declare CLI options
const optionDefinitions = [
  { name: 'port', alias: 'p', type: String, defaultValue: '8080' },
  { name: 'not-found', alias: 'n', type: String, defaultValue: 'src/html/index.html' },
  { name: 'views', alias: 'v', type: String, defaultValue: 'src/html' },
  { name: 'assets', alias: 'a', type: String, defaultValue: 'src/assets' },
  { name: 'js', alias: 'j', type: String, defaultValue: 'src/js' }
];

// CLI arguments lib
const options = commandLineArgs( optionDefinitions, { partial: true, camelCase: true } );

var app = express();

// Serve assets folder
app.use( '/assets', express.static( options.assets ) );

// Serve JavaScript folder
app.use( '/assets/js', express.static( options.js ) );

app.get('/*', function( req, res ){
  var errorPage = path.join( process.cwd(), options.notFound );
  
  if( req.url.match(htmlRegex) ) {
    var filePath = path.join( process.cwd(), options.views + req.url );

    fs.exists( options.views + req.url, function( exists ){
 
      if( exists ) {//If file exists then serve it  

        try{

          res.sendFile( filePath );

        } catch ( error ) {

          var msg = error.toString();
          msg =  msg.replace(new RegExp('>','g'), '&gt;');
          msg =  msg.replace(new RegExp('\n','g'), '<br>');
          res.send( msg );

        }
      } else {
        res.status(404).sendFile( errorPage );
      }
      
    });
  } else {
    res.status(404).sendFile( errorPage );
  }

});

app.listen(options.port);

var serverDir = 'http://localhost:' + options.port + '/index.html';

console.log('Starting web server on:' + serverDir );

opn(serverDir);

module.exports = app;