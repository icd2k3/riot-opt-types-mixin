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
*
* TODO:
*    - don't re-print errors that have already been displayed to user
*    - add "tag" optType to replace "node" and "element" from ReactPropTypes
*    - add a way to optionally disable validation for certain opt's.
*         ^ for example: "if", "each", and other attributes that are part of Riot's helpers
*/

// map React's propTypes to optTypes
module.exports.optTypes = ReactPropTypes;

const whitelist = 'id, class, dataIs, optTypes, riotTag';

let errors;

function appendError(err) {
    if (errors && errors.length) {
        errors.push(err);
    } else {
        errors = [err];
    }
}

function printErrors() {
    if (errors) {
        for (let i = 0; i < errors.length; i++) {
            console.error(errors[i]);
        }
    }
}

function validateOpts(optTypes, opts, tagName) {
    // clear previous errors
    errors = null;

    // check if the tag has any opts that are NOT defined in optTypes
    for (const key in opts) {
        if (!optTypes.hasOwnProperty(key) && whitelist.indexOf(key) === -1) {
            appendError(new Error(
                `Opt \`${key}\` was passed to tag \`${tagName}\`, but was not defined in \`optTypes\` object.`
            ));
        }
    }

    // validate all passed opts
    for (const key in optTypes) {
        if (optTypes.hasOwnProperty(key)) {
            const error = optTypes[key](opts, key, tagName);

            if (error) {
                appendError(error);
            }
        }
    }

    // print errors to console
    printErrors();
}

// riotjs mixin
export default {
    init: function init() {
        // validate tag opts on update (if optTypes was provided in tag)
        this.on('update', () => {
            if (this.optTypes && (this.opts.riotTag || this.opts.dataIs)) {
                validateOpts(this.optTypes, this.opts, this.opts.dataIs);
            }
        });

        // clear errors when tag unmounts
        this.on('unmount', () => {
            errors = null;
        });
    },

    // returns all current optType validation errors for the tag (only intended for testing purposes)
    getRiotOptTypesMixinErrors: () => {
        return errors;
    }
};
