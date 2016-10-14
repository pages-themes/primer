# Primer CSS Avatars

[![NPM version](http://img.shields.io/npm/v/primer-avatars.svg)](https://www.npmjs.org/package/primer-avatars)
[![Build Status](https://travis-ci.org/primer/avatars.svg?branch=master)](https://travis-ci.org/primer/avatars)

> Avatars are images that users can set as their profile picture. On GitHub, they’re always going to be rounded squares. They can be custom photos, uploaded by users, or generated as Identicons as a placeholder.

This repository is a module of the full [primer-css][primer-css] repository.

## Install

This repository is distributed with [npm][npm]. After [installing npm][install-npm], you can install `primer-avatars` with this command.

```
$ npm install --save primer-avatars
```

## Usage

The source files included are written in [Sass][sass] (`scss`) You can simply point your sass `include-path` at your `node_modules` directory and import it like this.

```scss
@import "primer-avatars/index.scss";
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
title: Avatars
status: Stable
homepage: https://github.com/primer/avatars
-->

### Avatars

Avatars are images that users can set as their profile picture. On GitHub, they're always going to be rounded squares. They can be custom photos, uploaded by users, or generated as Identicons as a placeholder.

#### Basic example

Add `.avatar` to any `<img>` element to make it an avatar. This resets some key styles for alignment, address a Firefox image placeholder bug, and rounds the corners.

Be sure to set `width` and `height` attributes for maximum browser performance.

```html
<img class="avatar" src="/jonrohan.png?v=3&s=144" width="72" height="72">
```

#### Small avatars

We occasionally use smaller avatars. Anything less than `48px` wide should include the `.avatar-small` modifier class to reset the `border-radius` to a more appropriate level.

```html
<img class="avatar avatar-small" src="/jonrohan.png?v=3&s=64" width="32" height="32">
```

#### Parent-child avatars

When you need a larger parent avatar, and a smaller child one, overlaid slightly, use the parent-child classes.

```html
<div class="avatar-parent-child left">
  <img class="avatar" src="/jonrohan.png?v=3&s=96" width="48" height="48">
  <img class="avatar avatar-child" src="/josh.png?v=3&s=40" width="20" height="20">
</div>
```

#### Avatar stack

Stacked avatars can be used to show who is participating in thread when there is limited space available. When you hover over the stack, the avatars will reveal themselves. Optimally, you should put no more than 3 avatars in the stack.

```html
<span class="avatar-stack tooltipped tooltipped-s" aria-label="jonrohan, aaronshekey, and josh">
  <img alt="@jonrohan" class="avatar" height="39" src="/jonrohan.png" width="39">
  <img alt="@aaronshekey" class="avatar" height="39" src="/aaronshekey.png" width="39">
  <img alt="@josh" class="avatar" height="39" src="/josh.png" width="39">
</span>
```

<!-- %enddocs -->

## License

[MIT](./LICENSE) &copy; [GitHub](https://github.com/)

[primer-css]: https://github.com/primer/primer
[docs]: http://primercss.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
