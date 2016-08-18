
'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var mkdirp = require('mkdirp');

const SERVICE_FOLDER = './src/client/app/frameworks/app/services/';

module.exports = yeoman.Base.extend({
  writing: function(){
    const name = this.arguments[0];
    this.fs.copyTpl(
      this.templatePath('_.service.ts'),
      this.destinationPath(`${SERVICE_FOLDER}/${name}.service.ts`), {name});    
  }
});