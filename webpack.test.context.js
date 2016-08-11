// this is used in karma.conf.js as the entry point for all tests
const testsContext = require.context('./', true, /\/test\/test\.spec\.js$|\/lib\/riot-opt-types-mixin\.js$/);

testsContext.keys().forEach(testsContext);
