# Primer CSS Flex-table

[![NPM version](http://img.shields.io/npm/v/primer-flex-table.svg)](https://www.npmjs.org/package/primer-flex-table)
[![Build Status](https://travis-ci.org/primer/flex-table.svg?branch=master)](https://travis-ci.org/primer/flex-table)

> Flex table is a module for creating dynamically resizable elements that always sit on the same horizontal line (e.g., they never break to a new line). Using table styles in our CSS means it’s cross browser friendly back to at least IE9.

This repository is a module of the full [primer-css][primer-css] repository.

## Install

This repository is distributed with [npm][npm]. After [installing npm][install-npm], you can install `primer-flex-table` with this command.

```
$ npm install --save primer-flex-table
```

## Usage

The source files included are written in [Sass][sass] (`scss`) You can simply point your sass `include-path` at your `node_modules` directory and import it like this.

```scss
@import "primer-flex-table/index.scss";
```

You can also import specific portions of the module by importing those partials from the `/lib/` folder. _Make sure you import any requirements along with the modules._

## Build

For a compiled **css** version of this module, a npm script is included that will output a css version to `build/build.css` The built css file is also included in the npm package.

```
$ npm run build
```

## Documentation

You can read more about other primer modules in the [full primer docs][docs].

<!-- %docs
title: Flex table
homepage: https://github.com/primer/flex-table
status: Stable
-->

### Flex table

Flex table is a module for creating dynamically resizable elements that always sit on the same horizontal line (e.g., they never break to a new line). Using table styles in our CSS means it's cross browser friendly back to at least IE9.

Additional `margin` or `padding` may be required to properly space content.

```html
<div class="flex-table">
  <div class="flex-table-item flex-table-item-primary">
    <input class="input-block form-control" type="text" placeholder="Long flexible input form">
  </div>
  <div class="flex-table-item">
    <button class="btn" type="button">Button</button>
  </div>
</div>
```

<!-- %enddocs -->

## License

[MIT](./LICENSE) &copy; [GitHub](https://github.com/)

[primer-css]: https://github.com/primer/primer
[docs]: http://primercss.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
