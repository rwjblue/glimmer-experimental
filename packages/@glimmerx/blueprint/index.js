'use strict';

const dasherize = require('ember-cli-string-utils').dasherize;
const classify = require('ember-cli-string-utils').classify;

module.exports = {
  description: 'Ember CLI blueprint for initializing a new Glimmer application',

  locals(options) {
    const name = dasherize(options.entity.name);
    const component = classify(name);
    const className = classify(options.entity.name);
    const blueprintVersion = require('./package').version;

    return {
      name,
      className,
      component,
      blueprintVersion,
    };
  },

  fileMapTokens(options) {
    return {
      __component__() {
        return options.locals.component;
      },
    };
  },

  files() {
    let files = this._super.files.apply(this, arguments);

    if (this._shouldIncludeYarnLockInFiles()) {
      files = files.filter((file) => file !== 'yarn.lock');
    }

    return files;
  },

  _shouldIncludeYarnLockInFiles() {
    return !!this.project.pkg.name;
  },
};
