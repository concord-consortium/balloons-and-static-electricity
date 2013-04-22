// Copyright 2002-2013, University of Colorado

/**
 * RequireJS configuration file for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
require.config( {
                  // An array of dependencies to load. Useful when require is defined as a config object before require.js
                  // is loaded, and you want to specify dependencies to load as soon as require() is defined.
                  deps: ['main'],

                  // baseUrl: don't bother trying to set it here, it is overridden by data-main in the top-level HTML file

                  // Path mappings for module names not found directly under baseUrl. The path settings are assumed to be
                  // relative to baseUrl unless the paths setting starts with a '/' or has a URL protocol.
                  paths: {

                    // common directories, uppercase names to identify them in require imports
                    PHETCOMMON: '../lib/phet/joist/lib/phet/phetcommon/js',
                    SCENERY: '../lib/phet/joist/lib/phet/scenery/js',
                    KITE: '../lib/phet/joist/lib/phet/scenery/common/kite/js',
                    PHET_CORE: '../lib/phet/joist/lib/phet/scenery/common/phet-core/js',
                    DOT: '../lib/phet/joist/lib/phet/scenery/common/dot/js',
                    ASSERT: '../lib/phet/joist/lib/phet/scenery/common/assert/js',
                    FORT: '../lib/phet/joist/lib/phet/fort/js',
                    SUN: '../lib/phet/joist/lib/phet/sun/js',
                    JOIST: '../lib/phet/joist/js',

                    // contrib dependencies required by common directories
                    stats: '../lib/phet/joist/lib/phet/phetcommon/contrib/stats-r11',
                    imagesloaded: '../lib/phet/joist/lib/phet/phetcommon/contrib/jquery.imagesloaded-2.1.1',

                    // local contrib dependencies
                    i18n: '../lib/i18n-2.0.2',
                    tpl: '../lib/tpl-0.2',
                    fastclick: '../lib/fastclick-0.5.6'
                  },

                  // Configure the dependencies and exports for older, traditional 'browser globals' scripts
                  // that do not use define() to declare the dependencies and set a module value.
                  shim: {
                    stats: {
                      exports: 'Stats'
                    },
                    fastclick: {
                      exports: 'FastClick'
                    }
                  },

                  config: {
                    i18n: {
                      locale: 'en_us' // change this to test other locales
                    }
                  },

                  //TODO: Remove this before deploy!
                  urlArgs: new Date().getTime()  // cache buster to make browser reload all included scripts
                } );