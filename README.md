# webpack-sass-glob-importer

[![npm version](https://badge.fury.io/js/webpack-sass-glob-importer.svg)](https://badge.fury.io/js/webpack-sass-glob-importer)

A custom loader for Webpack that allows glob import in Dart Sass.

## Installation

```console
npm install --save-dev postcss-loader postcss
```

Then add the plugin to your `webpack` config. For example:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["webpack-sass-glob-importer"],
      },
    ],
  },
};
```

## License

[MIT](./LICENSE)
