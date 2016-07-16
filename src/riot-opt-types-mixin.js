import ReactPropTypes from '../node_modules/react/lib/ReactPropTypes.js';

/**
* This is a slightly trimmed down port of React's PropTypes bundled as a riotjs mixin.
*
* Source of type checkers (React):
*   - https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js
*
* Usage:
*   import riotOptTypesMixin, { optTypes } from 'riot-opt-types-mixin';
*   <tag>
*       <script>
*           this.optTypes = {
*               name: optTypes.string.isRequired
*           };
*           this.mixin(riotOptTypesMixin);
*       </script>
*       <h1>Hello, {opts.name}</h1>
*   </tag>
*/

// used for local dev tests
const isTestEnv = window.__env && window.__env.NODE_ENV === 'test';

// keep track of current errors and previous opts in root scope
let prevOpts,
    errors;

function err(error) {
    if (!isTestEnv) {
        console.error(error);
    }
    if (errors && errors.length) {
        errors.push(error.toString());
    } else {
        errors = [error.toString()];
    }
}

// riotjs mixin
export default {
    init: function init() {
        const tagName = this.opts.dataIs,
            validateOpts = () => {
                errors = null;

                if (prevOpts && JSON.stringify(prevOpts) === JSON.stringify(this.opts)) {
                    return;
                }

                prevOpts = Object.assign({}, this.opts);

                // check if the tag has any opts that are NOT defined in optTypes
                for (const key in this.opts) {
                    if (!this.optTypes.hasOwnProperty(key)
                        && key !== 'dataIs'
                        && key !== 'optTypes'
                        && key !== 'riotTag') {
                        err(new Error(
                            `opt '${key}' was not defined in <${tagName}>'s optTypes config.`
                        ));
                    }
                }

                // validate all passed opts
                for (const key in this.optTypes) {
                    if (this.optTypes.hasOwnProperty(key)) {
                        const error = this.optTypes[key](this.opts, key, tagName, 'prop');

                        if (error) {
                            err(error);
                        }
                    }
                }
            };

        // if mixin was instantiated, but optTypes was not provided, we need to display console error
        if (!this.optTypes) {
            err(new Error(
                `optTypes object was not set in the tag <${tagName}> `
                + 'and is expected when using the mixin riot-opt-types-mixin.'
            ));
        }

        // validate all opts of the tag on mount and updated
        if (this.optTypes) {
            validateOpts();
            this.on('updated', validateOpts);
        }
        this.on('unmount', () => {
            errors = null;
            prevOpts = null;
        });
    },
    getRiotOptTypesMixinErrors: () => {
        if (!isTestEnv) {
            console.warn('The getRiotOptTypesMixinErrors function is only intended to be used for testing purposes');
        }
        return errors;
    },
    getRiotOptTypesPrevOpts: () => {
        if (!isTestEnv) {
            console.warn('The getRiotOptTypesPrevOpts function is only intended to be used for testing purposes');
        }
        return prevOpts;
    }
};

module.exports.optTypes = ReactPropTypes;
