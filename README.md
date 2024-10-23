# @cjamesgawn/tailwind-fundamentals

[![npm version](https://img.shields.io/npm/v/@cjamesgawn/tailwind-fundamentals.svg)](https://www.npmjs.com/package/@cjamesgawn/tailwind-fundamentals)  
[![License](https://img.shields.io/npm/l/@cjamesgawn/tailwind-fundamentals.svg)](LICENSE)

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Features](#features)
  - [Fluid Typography](#fluid-typography)
  - [Containers](#containers)
  - [Pixelated Spacing](#pixelated-spacing)
- [License](#license)

## Introduction

`@cjamesgawn/tailwind-fundamentals` is a Tailwind CSS plugin designed to enhance your workflow with advanced typography, container, and spacing utilities. This plugin is made up of three key components:

1. **Fluid Typography**: Easily scalable typography that adjusts fluidly across different screen sizes.
2. **Containers**: Flexible and responsive container system, offering more control and consistency.
3. **Pixelated Spacing**: Simplified and powerful spacing utilities that improve layout precision.

## Installation

You can install this package via npm:

```bash
npm install @cjamesgawn/tailwind-fundamentals
```

```js file=tailwind.config.js
// Import the package in your Tailwind config
const tailwindFundamentals = require('@cjamesgawn/tailwind-fundamentals');
```

## Features

### Fluid Typography

#### Usage

**Fluid Typography** calculates fluid typography settings for responsive design.

This function generates CSS clamp values for fluid font sizes and line heights
that adapt to the viewport width, allowing for a responsive typography experience.

#### Examples

```html
<!-- Example using fluid typography -->
<h1 class="text-h1">Responsive Heading</h1>
<p class="text-copylg">Responsive Large Copy</p>
```

#### Configuration

```js
@param {number|string} minValue - The minimum font size. If an integer is provided, it is assumed to be in pixels.
If a string is provided with a `rem` suffix, it will be treated as such.
@param {number|string} maxValue - The maximum font size. Similar to `minValue`, can be provided as an integer or a `rem` value.
@param {number|string} minLineHeight - The minimum line height value. Accepts integers (assumed as pixels) or `rem` values.
@param {number|string} maxLineHeight - The maximum line height value. Same format as `minLineHeight`.
@param {string} [letterSpacing='0'] - The letter spacing to be applied. Defaults to `0`.
@param {string} [fontWeight='400'] - The font weight to be applied. Defaults to `400`.
@param {number|string} [minWidth=320] - The minimum viewport width at which font scaling begins. Defaults to `320`.
Can be provided as an integer (assumed in pixels) or `rem`.
@param {number|string} [maxWidth=1920] - The maximum viewport width at which font scaling ends. Defaults to `1920`.
Same format as `minWidth`.

@returns {[string, Object]} An array containing:

- A string representing the CSS clamp function for the fluid font size.
- An object with the following properties:
  - `lineHeight`: A string for the clamp value of line height.
  - `letterSpacing`: The specified letter spacing.
  - `fontWeight`: The specified font weight.

module.exports = {
  theme: {
    extend: {
      fontSize: {
        h1: tailwindFundamentals.fluidType(30, 40, 36, 46, 0, 400, 320, 1920),
      },
    },
  },
};
```

```js file=tailwind.config.js
module.exports = {
	theme: {
		extend: {
			fontSize: {
				h1: tailwindFundamentals.fluidType(30, 40, 36, 46, 0, 600),
				copylg: tailwindFundamentals.fluidType(18, 24, 22, 28),
			},
		},
	},
};
```

### Containers

#### Usage

For **Containers**, add the plugin in your `tailwind.config.js`:

```js file=tailwind.config.js
module.exports = {
	plugins: [tailwindFundamentals.containers],
};
```

#### Examples

```html
<!-- Example using containers -->
<div class="container-md">
	<!-- Content here will have a max-width of 1440px and padding values depending on the view width -->
</div>
```

#### Configuration

The maxWidth is requried. Aswell as the default padding. Padding is applied on the x-axis. The responsive paddings are optional and there can be as many as needed. The responsive paddings use paramenters set in the screens object in your `tailwind.config.js`:

```js file=tailwind.config.js
module.exports = {
	theme: {
		extend: {
			screens: {
				sm: '782px',
			},
		},
	},
};
```

Configure containers as below:

```js file=tailwind.config.js
module.exports = {
	theme: {
		containers: {
			DEFAULT: [
				'1440px', // maxWidth
				'1rem', // default padding
				{
					sm: '1rem', // responsive padding applied at 782px vw
				},
			],
		},
	},
};
```

### Pixelated Spacing

#### Usage

**Pixelated Spacing** creates utility classes that utilize pixels as the inline value, providing more granular control over spacing in your layouts. For instance, `m-4` now translates to `margin: 0.25rem;` (4px) instead of the traditional `margin: 1rem;`.

The plugin is designed to accept pixel values up to and including 150 in the standard settings. This maximum value can be adjusted by adding the follwing:

```js file=tailwind.config.js
module.exports = {
	theme: {
		spacing: {
			MAX: 200, // New max is 200px
		},
	},
};
```

However, it’s important to note that using large values may **_significantly_** increase the demand during compilation. Therefore, it is advisable to set a maximum that encompasses frequently used values rather than rarely used outliers. You're a clever cookie, you can guage this yourself :slightly_smiling_face:

This plugin currently supports the following settings:

- Height
- Min height
- Max height
- Width
- Min width
- Max width
- Margin (including negative values)
- Padding (including negative values)
- Gap
- Absolute values
- Inset

With **Pixelated Spacing**, you gain the flexibility to create precise and responsive designs that align with your layout needs.

## License

This project is licensed under the [LICENSE](/LICENSE) license.
