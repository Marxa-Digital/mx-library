const npsUtils = require( 'nps-utils' )

module.exports = {
  scripts: {
    lib: {
      test: npsUtils.ifNotWindows( 'ng test @marxa/$LIB', 'ng test @marxa/%LIB%' ),
      'go-n-watch': {
        default: npsUtils.ifNotWindows( 'cd libs/marxa/$LIB && ng build @marxa/$LIB --watch', 'cd libs/marxa/%LIB% && start cmd /k ng build @marxa/%LIB% --watch' ),
        description: 'Navigates to the folder containing the library and runs the lib in watch mode, it meas, it refreshes when any changes are made. In windows, it opens a new cmd window'
      },
      build: npsUtils.ifNotWindows( 'ng build @marxa/$LIB --prod', 'ng build @marxa/%LIB% --prod' ),
      install: npsUtils.ifNotWindows( 'npm i @marxa/$LIB -s', 'npm i @marxa/%LIB% -s' ),
      installLocal: npsUtils.ifNotWindows( 'npm i "./dist/marxa/$LIB" && npm run nps link.styles', 'npm i "./dist/marxa/%LIB%" && npm run nps link.styles' ),
      publish: npsUtils.ifNotWindows( 'cd "dist/marxa/$LIB" && npm publish', 'cd "dist/marxa/%LIB%" && npm publish' ),
      schematics: npsUtils.ifNotWindows( 'cd "widgets/marxa/$LIB" && npm run build && cd ../../../ ', 'cd "widgets/marxa/%LIB%" && npm run build && cd ../../../ ' ),
      uninstall: npsUtils.ifNotWindows( 'npm uninstall @marxa/$LIB', 'npm uninstall @marxa/%LIB%' ),
      updateLocal: npsUtils.ifNotWindows( 'npm uninstall @marxa/$LIB && npm i "./dist/marxa/$LIB"', 'npm uninstall @marxa/%LIB% && npm i "./dist/marxa/%LIB%"' ),
      watch: npsUtils.ifNotWindows( 'ng build @marxa/$LIB --watch', 'ng build @marxa/%LIB% --watch' ),
    },
    link: {
      lib: npsUtils.ifNotWindows( 'npm link dist/marxa/$LIB', 'npm link dist/marxa/%LIB%' ),
      project: npsUtils.ifNotWindows( 'cd "dist/marxa/$LIB" && npm link', 'cd "dist/marxa/%LIB%" && npm link' ),
      styles: npsUtils.ifNotWindows( 'cpx "projects/marxa/$LIB/src/lib/styles/**/*" "dist/marxa/$LIB/styles"', 'cpx "widgets/marxa/%LIB%/src/lib/styles/**/*" "dist/marxa/%LIB%/styles"' )
    },
    publish: {
      default: 'nps lib.build link.project link.lib link.styles lib.publish',
      package: npsUtils.ifNotWindows( 'cd "dist/marxa/$LIB" && npm publish', 'cd "dist/marxa/%LIB%" && npm publish' ),
      schematics: 'nps "build-lib link.project link.styles buildLib.schematics link.lib lib.publish',
    },
  }
};
