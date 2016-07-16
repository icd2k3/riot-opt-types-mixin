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

## Supported optTypes
| Type                | Definition          | Example          |
| ------------------- |:------------------- |:---------------- |
| any                 | Will pass if any opt type is passed | `<my-tag opt={true}/> = OK`, `<my-tag/> = ERROR` |
| array               | Opt must be an array  |  `<my-tag opt={[]}/> = OK`, `<my-tag opt={'not array'}/> = ERROR` |

#### todo: arrayOf
#### todo: bool
#### todo: func
#### todo: number
#### todo: object
#### todo: oneOf
#### todo: shape
#### todo: string

## Why?
I really loved this functionality in [React](https://facebook.github.io/react/) and wanted to be able to utilize it in [Riot](http://riotjs.com) apps.

This mixin isn't really benefitial to small applications, but it can help while developing larger applications.

## Contributing
Please contact me at icd2k3@gmail.com if you have any questions, suggestions, or issues.

### Developing Locally
Clone this repo and run `npm run start` to compile /src to /lib and run `npm run test` to run unit tests. 

## Thanks
Most of the functionality is a direct port of React's [PropTypes](https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js).
