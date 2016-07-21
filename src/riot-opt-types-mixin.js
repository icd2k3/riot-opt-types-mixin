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
*    - don't re-print _errors that have already been displayed to user
*    - add "tag" optType to replace "node" and "element" from ReactPropTypes
*    - add a way to optionally disable validation for certain opt's.
*         ^ for example: "if", "each", and other attributes that are part of Riot's helpers
*/

// map React's propTypes to optTypes
module.exports.optTypes = ReactPropTypes;

let _errors;
const _whitelist = Object.freeze({
        class: true,
        dataIs: true,
        id: true,
        optTypes: true,
        riotTag: true
    }),
    
    // add a new error to the _errors list
    _appendError = (err) => {
        if (_errors && _errors.length) {
            _errors.push(err);
        } else {
            _errors = [err];
        }
    },

    // console log all _errors in the list above
    _printErrors = () => {
        if (_errors) {
            for (let i = 0; i < _errors.length; i++) {
                console.error(_errors[i]);
            }
        }
    },

    // validate all opts the tag was passed (excluding '_whitelist') based on optTypes rules
    _validateOpts = (optTypes, opts, tagName) => {
        // clear previous _errors
        _errors = null;

        // check if the tag has any opts that are NOT defined in optTypes
        for (const key in opts) {
            if (!optTypes.hasOwnProperty(key) && !_whitelist[key]) {
                _appendError(new Error(
                    `Opt \`${key}\` was passed to tag \`${tagName}\`, but was not defined in \`optTypes\` object.`
                ));
            }
        }

        // validate all passed opts
        for (const key in optTypes) {
            if (optTypes.hasOwnProperty(key)) {
                const err = optTypes[key](opts, key, tagName);

                if (err) {
                    _appendError(err);
                }
            }
        }

        // print _errors to console
        _printErrors();
    };

// riotjs mixin
export default {
    init: function init() {
        // validate tag opts on update (if optTypes was provided in tag)
        this.on('update', () => {
            if (this.optTypes && (this.opts.riotTag || this.opts.dataIs)) {
                _validateOpts(this.optTypes, this.opts, this.opts.dataIs);
            }
        });

        // clear _errors when tag unmounts
        this.on('unmount', () => {
            _errors = null;
        });
    },

    // returns all current optType validation _errors for the tag (only intended for testing purposes)
    getRiotOptTypesMixinErrors: () => {
        return _errors;
    }
};
