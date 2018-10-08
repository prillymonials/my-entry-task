'use strict';

const statsOpt = {
  all: false,
  modules: false,
  maxModules: 0,
  errors: true,
  warnings: true
};

module.exports = function reporter(middlewareOptions, options) {
  const { log, state, stats } = options;

  if (state) {
    const displayStats = (middlewareOptions.stats !== false);

    if (displayStats) {
      if (stats.hasErrors()) {
        log.error(stats.toString(statsOpt));
      } else if (stats.hasWarnings()) {
        log.warn(stats.toString(statsOpt));
      } else {
        log.info(stats.toString(statsOpt));
      }
    }

    let message = 'Compiled successfully.';

    if (stats.hasErrors()) {
      message = 'Failed to compile.';
    } else if (stats.hasWarnings()) {
      message = 'Compiled with warnings.';
    }
    log.info(message);
  } else {
    log.info('Compiling...');
  }
};
