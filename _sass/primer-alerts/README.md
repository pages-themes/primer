# Primer CSS Alerts

[![NPM version](http://img.shields.io/npm/v/primer-alerts.svg)](https://www.npmjs.org/package/primer-alerts)
[![Build Status](https://travis-ci.org/primer/alerts.svg?branch=master)](https://travis-ci.org/primer/alerts)

> Flash messages, or alerts, inform users of successful or pending actions. Use them sparingly. Don’t show more than one at a time.

This repository is a module of the full [primer-css][primer-css] repository.

## Install

This repository is distributed with [npm][npm]. After [installing npm][install-npm], you can install `primer-alerts` with this command.

```
$ npm install --save primer-alerts
```

## Usage

The source files included are written in [Sass][sass] (`scss`) You can simply point your sass `include-path` at your `node_modules` directory and import it like this.

```scss
@import "primer-alerts/index.scss";
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
title: Alerts
homepage: https://github.com/primer/alerts
status: Stable
-->

### Alerts

Flash messages, or alerts, inform users of successful or pending actions. Use them sparingly. Don't show more than one at a time.

#### Default

Flash messages start off looking decently neutral—they're just light blue rounded rectangles.

```html
<div class="flash">
  Flash message goes here.
</div>
```

You can put multiple paragraphs of text in a flash message—the last paragraph's bottom `margin` will be automatically override.

```html
<div class="flash">
  <p>This is a longer flash message in it's own paragraph. It ends up looking something like this. If we keep adding more text, it'll eventually wrap to a new line.</p>
  <p>And this is another paragraph.</p>
</div>
```

Should the need arise, you can quickly space out your flash message from surrounding content with a `.flash-messages` wrapper. *Note the extra top and bottom margin in the example below.*

```html
<div class="flash-messages">
  <div class="flash">
    Flash message goes here.
  </div>
</div>
```

#### Variations

Add `.flash-warn` or `.flash-error` to the flash message to make it yellow or red, respectively.

```html
<div class="flash flash-warn">
  Flash message goes here.
</div>
```

```html
<div class="flash flash-error">
  Flash message goes here.
</div>
```

#### With icon

Add an icon to the left of the flash message to give it some funky fresh attention. Just add `.flash-with-icon` and your Octicon.

```html
<div class="flash flash-with-icon">
  <%= octicon "alert" %>
  Flash message with an icon goes here.
</div>
```

#### Dismiss

Add a JavaScript enabled (via Crema) dismiss (close) icon on the right of any flash message.

```html
<div class="flash">
  <button class="flash-close js-flash-close"><%= octicon "x" %></button>
  Dismissable flash message goes here.
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
