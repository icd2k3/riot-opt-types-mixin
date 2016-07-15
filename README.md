# riot-opt-types-mixin
> A slightly trimmed-down [Riot](http://riotjs.com) mixin port of [React](https://facebook.github.io/react/)'s [PropTypes](https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js) functionality.

## Installation
`npm install riot-opt-types-mixin --save-dev`

## Usage
Define `this.optTypes = {}` in your riotjs tag, then include riot-opt-types-mixin as a mixin like so:

    ```javascript
import riotOptTypesMixin, { optTypes } from 'riot-opt-types-mixin';

<my-tag>
    <script>
        this.optTypes = {
            name: optTypes.string.isRequired
        };
        this.mixin(riotOptTypesMixin);
    </script>
    <h1>Hello, {opts.name}</h1>
</my-tag>
    ```

## Supported optTypes
#### any
#### array
#### arrayOf
#### bool
#### func
#### number
#### object
#### oneOf
#### shape
#### string

## Why?
I really loved this functionality in [React](https://facebook.github.io/react/) and wanted to be able to do it in [Riot](http://riotjs.com)

## Contributing
Please contact me at icd2k3@gmail.com if you have any questions, suggestions, or issues.

### Developing Locally
Clone this repo and run `npm run start` to compile /src to /lib and run `npm run test` to run unit tests. 

## Thanks
Most of the functionality is a direct port of React's [PropTypes](https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js).
