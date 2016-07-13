'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var camelCase = require('camel-case');
var capitalize = require('capitalize');
var walk = require('fs-walk').walk;
var fs = require('fs');

module.exports = yeoman.Base.extend({
  initializing: function () {
    // Use nativescript-plugin-seed npm module as template
    this.sourceRoot(path.join(__dirname, '../../node_modules/angular2-seed-advanced/'));
    this.options = {
      author: {
        name: this.user.git.name(),
        email: this.user.git.email()
      }
    };
  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the solid ' + chalk.red('generator-ng2-seed-advanced') + ' generator!'
    ));

    var prompts = [{
        type: 'input',
        name: 'name',
        message: 'What is your project name?',
        default: 'yourproject'
      }, {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub user name?',
        default: 'someuser'
      }, {
        type: 'confirm',
        name: 'electron',
        message: 'Would you like to enable NativeScript cross platform mobile (w/ native UI) apps?',
        default: true
      }, {
        type: 'confirm',
        name: 'nativescript',
        message: 'Would you like to enable electron cross platform desktop apps (Mac, Windows and Linux)?',
        default: true
      }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      var name = props.name.replace(/\ /g, '-');
      this.options.name = {
        dashed: name,
        camel: camelCase(name),
        spaced: capitalize(name.replace(/\-/, ' ')),
        capitalize: capitalize.words(name).replace(/\-/, '')
      };
      // TODO: validate user name if it contain illegal chars
      var username = props.username.replace(/\ /g, '');
      this.options.author.githubId = username;

      this.options.electron = props.electron;
      this.options.nativescript = props.nativescript;
    }.bind(this));
  },


  writing: {
    dest: function () {
      var root = this.sourceRoot();
      this.destinationRoot(path.join(this.destinationRoot(), this.options.name.dashed));
      var dest = this.destinationRoot();
      var that = this;

      var execute = function (basedir, filename, stat, next) {
        var relativePath = basedir.replace(root, '');
        var filePath = path.join(basedir, filename);
        //console.log('relative: ' + relativePath);

        if (stat.isDirectory()) {
          // ignore node_modules folder
          if (filename === 'node_modules') {
            return next();
          };

          if(!that.options.nativescript && filename.indexOf('nativescript')){
            return next();
          }

          fs.mkdir(path.join(dest, relativePath, filename), next);
          //console.log('dir: ' + filePath);
          walk(filePath, execute, function (err) {
            //console.error('Error on file dir: ' + err);
          });
          return;
        }

        //console.log('file: ' + filePath);
        fs.readFile(filePath, function (err, stream) {
          if (err) {
            return console.error('Error reading file: ' + err);
          }

          // omit the electron main file
          else if (!that.options.electron && filename.indexOf('main.desktop.ts') > -1) {
            return next();
          }

          var fileString = stream.toString();
          var writeFilePath = path.join(dest, relativePath, filename);

          // Templating
          fileString = fileString.replace(/angular2-seed-advanced/g, that.options.name.dashed);
          fileString = fileString.replace(/NathanWalker/g, that.options.author.githubId);
          //fileString = fileString.replace(/nativescript-yourproject/g, 'nativescript-' + that.options.name.dashed);
          //fileString = fileString.replace(/yourproject.android.ts/g, that.options.name.dashed + '.android.ts');
          //fileString = fileString.replace(/yourproject.common.ts/g, that.options.name.dashed + '.common.ts');
          //fileString = fileString.replace(/yourproject.ios.ts/g, that.options.name.dashed + '.ios.ts');
          //fileString = fileString.replace(/yourproject.js/g, that.options.name.dashed + '.js');
          //fileString = fileString.replace(/yourproject/g, that.options.name.dashed);
          //fileString = fileString.replace(/yourproject/g, that.options.name.capitalize);
          //fileString = fileString.replace(/[y|Y]our [n|N]ame/g, that.options.author.name);
          //fileString = fileString.replace(/YourName/g, that.options.author.name);          
          fileString = fileString.replace(/youremail@yourdomain.com/g,'<' + that.options.author.email + '>');

          fs.writeFile(writeFilePath, fileString, next);
        });
      };

      walk(root, execute, function (err) {
        //console.error('Error procesing file: ' + err);
      });
    }
  },

  install: function () {
    this.npmInstall();
  },

  end: function () {
    this.log(yosay(
      'Happy coding, ' + chalk.green('enjoy') + ' you plugin!'
    ));
  }
});

/**
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the sublime ' + chalk.red('generator-ng2-seed-advanced') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});*/
