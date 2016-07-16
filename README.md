# riot-opt-types-mixin
> A slightly trimmed-down [Riot](http://riotjs.com) mixin port of [React](https://facebook.github.io/react/)'s [PropTypes](https://facebook.github.io/react/docs/reusable-components.html) functionality.

This mixin will monitor the opts being passed to your tags. If your tag is passed opts it doesn't expect, this mixin will warn you via a console error.

## Installation
`npm install riot-opt-types-mixin --save-dev`

## Usage
Define `this.optTypes = {}` in your riotjs tag, then include riot-opt-types-mixin as a mixin like so:

``` javascript
import riotOptTypesMixin, { optTypes } from 'riot-opt-types-mixin';
        
<my-tag>
    this.optTypes = {
        name: optTypes.string.isRequired
    };
    this.mixin(riotOptTypesMixin);
    
    <h1>Hello, {opts.name}</h1>
</my-tag>
```

## All optTypes Example

``` javascript
import riotOptTypesMixin, { optTypes } from 'riot-opt-types-mixin';
        
<my-tag>
    this.optTypes = {
        anyOpt   : optTypes.any,
        arrayOpt : optTypes.array,
        arrayOf  : optTypes.arrayOf,
        bool     : optTypes.bool,
        func     : optTypes.func,
        number   : optTypes.number,
        object   : optTypes.object,
        oneOf    : optTypes.oneOf,
        shape    : optTypes.shape,
        string   : optTypes.string
    };
    this.mixin(riotOptTypesMixin);
    
    <h1>Example Tag</h1>
</my-tag>
```

#### todo: arrayOf
#### todo: bool
#### todo: func
#### todo: number
#### todo: object
#### todo: oneOf
#### todo: shape
#### todo: string

## Why?
I really loved this functionality in [React](https://facebook.github.io/react/) and wanted to be able to do it in [Riot](http://riotjs.com)

## Contributing
Please contact me at icd2k3@gmail.com if you have any questions, suggestions, or issues.

### Developing Locally
Clone this repo and run `npm run start` to compile /src to /lib and run `npm run test` to run unit tests. 

## Thanks
Most of the functionality is a direct port of React's [PropTypes](https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js).
