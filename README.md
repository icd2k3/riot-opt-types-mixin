# riot-opt-types-mixin
> A direct port of [React](https://facebook.github.io/react/)'s [PropTypes](https://facebook.github.io/react/docs/reusable-components.html) for usage in [Riot](http://riotjs.com) tags.

This mixin will monitor the opts being passed to your tags. If your tag is passed opts it doesn't expect, this mixin will warn you via a console error.

## Installation
Still in active development... I will update when it is published to npm.

## Usage
Define `this.optTypes = {}` in your riotjs tag, then include riot-opt-types-mixin as a mixin like so:

#### Simple Example
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
Now, if you pass `name` incorrectly to `<my-tag>` you get a nice descriptive error in your browser's console

```javascript
<my-tag name={100}/> = Invalid opt 'name' of type 'number' supplied to 'my-tag', expected 'string'.
```

#### Advanced Example
You can also nest opt validation which can be useful when combined state management tools such as [Redux](http://redux.js.org)

``` javascript
this.optTypes = {
    state: optTypes.shape({
        myReducer: optTypes.shape({
            name: optTypes.string.isRequired
        })
    }),
    dispatch: optTypes.func.isRequired
};
```
Please refer to React's PropTypes [Documentation](https://facebook.github.io/react/docs/reusable-components.html) for more info on how to use these optTypes.

## Supported `optTypes`
- optTypes.any
- optTypes.arrayOf
- optTypes.array
- optTypes.bool
- optTypes.func
- optTypes.instanceOf
- optTypes.node
- optTypes.number
- optTypes.objectOf
- optTypes.object
- optTypes.oneOf
- optTypes.oneOfType
- optTypes.shape
- optTypes.string

Please refer to React's PropTypes [Documentation](https://facebook.github.io/react/docs/reusable-components.html) if you have any questions about how each of these function.

This mixin feature all the same `optTypes` listed in React's documentation <strong>except</strong> for `element` which validates React components. I plan on appending a "tag" checker soon for Riot.

## Why?
I'm a big fan of this functionality in [React](https://facebook.github.io/react/) and wanted to be able to utilize it in [Riot](http://riotjs.com) apps.

This mixin isn't really benefitial to small projects, but it can help while developing larger applications because it forces your tags to be very strictly define what inputs they expect from their parent tags, or application state (redux, flux, etc).

## Size
Compressed this mixin clocks in at about 6kb <strong>BUT</strong>, really it is only benefitial for local development, so you can (and probably should) trim it out for deployment builds. (TODO: add documentation about how to do this...)

## Contributing
Please contact me at icd2k3@gmail.com if you have any questions, suggestions, or issues.

To develop locally, clone this repo and run `npm run start` to compile /src -> /lib and run `npm run ` to run the unit s. 

## Thanks
Most of the functionality is a direct port of React's [PropTypes](https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js).
