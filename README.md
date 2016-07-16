# riot-opt-types-mixin
> A direct port of [React](https://facebook.github.io/react/)'s [PropTypes](https://facebook.github.io/react/docs/reusable-components.html) for usage in [Riot](http://riotjs.com) tags.

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

## Documentation
Please refer to React's PropTypes [Documentation](https://facebook.github.io/react/docs/reusable-components.html). This mixin feature all the same PropTypes <strong>except</strong> for "element" which validates React components. I plan on appending a "tag" checker soon for Riot.

## Why?
I really loved this functionality in [React](https://facebook.github.io/react/) and wanted to be able to utilize it in [Riot](http://riotjs.com) apps.

This mixin isn't really benefitial to small projects, but it can help while developing larger applications because it forces your tags to be very strictly define what inputs they expect from their parent tags, or application state (redux, flux, etc).

## Contributing
Please contact me at icd2k3@gmail.com if you have any questions, suggestions, or issues.

### Developing Locally
Clone this repo and run `npm run start` to compile /src to /lib and run `npm run test` to run unit tests. 

## Thanks
Most of the functionality is a direct port of React's [PropTypes](https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js).
