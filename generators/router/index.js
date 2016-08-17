
'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var mkdirp = require('mkdirp');

const COMPONENT_FOLDER = './src/client/app/components/';

module.exports = yeoman.Base.extend({
  writing: function(){
    const name = this.arguments[0];
    const foldername = COMPONENT_FOLDER+this.arguments[0]+'/';
    this.log("Creating folder: " + chalk.magenta(name));
    mkdirp.sync(foldername, function(err){
      if (err) console.error(err)
    });

    this.fs.copyTpl(
      this.templatePath('_.routes.ts'),
      this.destinationPath(`${foldername}/${name}.routes.ts`), {name});    
  }
});