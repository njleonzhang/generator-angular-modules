'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')
var path = require('path')
var glob = require('glob')
var _ = require('underscore.string')
var ejs = require('ejs')

module.exports = yeoman.Base.extend({
  ///////////////////////////////////////////////////////////////////////////////
  // Process directories applying template to files with leading underscore
  // Adapted from: http://bit.ly/1WmHME0
  //
  _processDirectory: function(source, destination, data) {
    var root = path.join(this.sourceRoot(), source)
    var files = glob.sync('**/*.*', { dot: true, cwd: root })

    for (var i = 0; i < files.length; i++) {
      var f = files[i]
      var src = path.join(root, f)
      var dest
      if (path.basename(f).indexOf('_') === 0) {
        dest = path.join(destination,
          path.dirname(f),
          path.basename(f).replace(/^_/, ''))

        dest = ejs.render(dest, data)
        this.template(src, dest, data)
      } else {
        dest = path.join(destination, f)
        dest = ejs.render(dest, data)

        try{
          this.bulkCopy(src, dest)
        } catch (e) {
          // if it's folder, skip the error
          if (e.code !== 'EISDIR') {
            console.log(e)
          }
        }
      }
    }
  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to leon\'s ' + chalk.red('generator-angular-modules') + ' generator!'
    ))

    var prompts = [
      {
        type: 'input',
        name: 'moduleName',
        message: 'What\'s the module name?',
        default: _.camelize(this.appname) // Default to current folder name
      },
      {
        type: 'input',
        name: 'name',
        message: 'What\'s the component name?',
        default: _.camelize(this.appname) // Default to current folder name
      },
      {
        type: 'input',
        name: 'userName',
        message: 'The author\'s name? (for config files)',
        default: this.user.git.name || 'Your Name'
      },
      {
        type: 'input',
        name: 'userEmail',
        message: 'Author email? (for config files)',
        default: this.user.git.email || 'email@example.com'
      },
      {
        type: 'input',
        name: 'gitAddress',
        message: 'git address for bower register',
        default: 'https://github.com/***/**.git'
      }
    ]

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer
      props.moduleName = _.camelize(props.moduleName)
      props.name = _.camelize(props.name)
      props.className = _.slugify(_.humanize(props.name))
      this.props = props
    }.bind(this))
  },

  writing: function () {
    console.log(this.props)
    this._processDirectory('', '', this.props)
  },

  install: function () {
    this.installDependencies()
  }
})
