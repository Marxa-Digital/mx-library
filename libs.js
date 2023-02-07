// we need to run our script, so we need to run a new process
const npm = require( 'npm-commands' );

// arguments are passed through by default
npm().run( 'build' );
