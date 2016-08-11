<a href="https://david-dm.org/icd2k3/react-redux-slideshow-example/?type=dev">![David](https://david-dm.org/icd2k3/react-redux-slideshow-example/dev-status.svg)</a> ![Travis](https://travis-ci.org/icd2k3/riot-opt-types-mixin.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/icd2k3/riot-opt-types-mixin/badge.svg?branch=master)](https://coveralls.io/github/icd2k3/riot-opt-types-mixin?branch=master)

# riot-opt-types-mixin
> A direct port of [React](https://facebook.github.io/react/)'s [PropTypes](https://facebook.github.io/react/docs/reusable-components.html) for usage in [Riot](http://riotjs.com) tags.

This mixin will monitor the opts being passed to your tags. If your tag is passed opts it doesn't expect, this mixin will warn you via a console error.

## Installation
`npm install riot-opt-types-mixin --save-dev`

## Usage
Define `this.optTypes = {}` in your riotjs tag, then include riot-opt-types-mixin as a mixin like so:

#### Simple Example

`index.js`:
``` javascript
import riotOptTypesMixin from 'riot-opt-types-mixin';
riot.mixin(riotOptTypesMixin);  // apply mixin to all tags
```
`app.tag`:
``` javascript
import { optTypes } from 'riot-opt-types-mixin';
<app>
    <script>
        // define expected opts (attributes) for your tag
        this.optTypes = {
            name: optTypes.string.isRequired
        };
    </script>
    
    <h1>Hello, {opts.name}</h1>
</app>
```

Now, if you pass `name` incorrectly to `<my-tag>` you get a nice descriptive error in your browser's console

```javascript
<app name={100}/> = Invalid opt 'name' of type 'number' supplied to 'my-tag', expected 'string'.
```

#### Advanced Example
You can also nest opt validation which can be useful when combined state management tools such as [Redux](http://redux.js.org)

``` javascript
this.optTypes = {
    state: optTypes.shape({
        data: optTypes.shape({
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
- optTypes.number
- optTypes.objectOf
- optTypes.object
- optTypes.oneOf
- optTypes.oneOfType
- optTypes.shape
- optTypes.string

Please refer to React's PropTypes [Documentation](https://facebook.github.io/react/docs/reusable-components.html) if you have any questions about how each of these function.

This mixin feature all the same `optTypes` listed in React's documentation <strong>except</strong> for `element` and `node` which validates React components. I plan on appending a "tag" checker soon for Riot.

## Why?
I'm a big fan of this functionality in [React](https://facebook.github.io/react/) and wanted to be able to utilize it in [Riot](http://riotjs.com) apps.

This mixin isn't really benefitial to small projects, but it can help while developing larger applications because it forces your tags to strictly define what inputs they expect from their parent tags, or application state (redux, flux, etc).

## Size
This mixin, when compressed, clocks in at about 5kb <strong>BUT</strong>, really it is only benefitial for local development, so you can (and probably should) trim it out for deployment builds.

If using webpack, [strip-loader](https://github.com/yahoo/strip-loader) and [NormalModuleReplacementPlugin](https://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin) are good places to start.
(TODO: add more documentation about how to do this...)

## Alternatives
Using Riot in conjunction with TypeScript allows for setting of expected prop types. [RiotTS](https://github.com/nippur72/RiotTS) looks like a good option if you're interested in using TypeScript for your Riot app.

## Contributing
PRs welcome! Please contact me if you have any questions, suggestions, or issues too!

## Thanks
Most of the functionality is a direct port of React's [PropTypes](https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js).
