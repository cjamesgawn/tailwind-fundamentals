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

**Fluid Typography** calculates fluid typography settings for responsive design.

This function generates CSS clamp values for fluid font sizes and line heights
that adapt to the viewport width, allowing for a responsive typography experience.

#### Configuration & Usage

##### Configuration Parameters

- **`minValue`** (`number|string`):

  - The minimum font size.
  - If provided as an integer, it is assumed to be in pixels.
  - If provided as a string with a `rem` suffix, it will be treated as such.

- **`maxValue`** (`number|string`):

  - The maximum font size.
  - Similar to `minValue`, it can be provided as an integer (pixels) or as a `rem` value.

- **`minLineHeight`** (`number|string`):

  - The minimum line height value.
  - Accepts integers (assumed to be in pixels) or `rem` values.

- **`maxLineHeight`** (`number|string`):

  - The maximum line height value.
  - Follows the same format as `minLineHeight`.

- **`letterSpacing`** (`string`, optional, default: `'0'`):

  - The letter spacing to be applied.

- **`fontWeight`** (`string`, optional, default: `'400'`):

  - The font weight to be applied.

- **`minWidth`** (`number|string`, optional, default: `320`):

  - The minimum viewport width at which font scaling begins.
  - Can be provided as an integer (pixels) or as a `rem`.

- **`maxWidth`** (`number|string`, optional, default: `1920`):
  - The maximum viewport width at which font scaling ends.
  - Follows the same format as `minWidth`.

##### Returns

The function returns an array containing:

- A string representing the CSS clamp function for the fluid font size.
- An object with the following properties:
  - **`lineHeight`**: A string for the clamp value of line height.
  - **`letterSpacing`**: The specified letter spacing.
  - **`fontWeight`**: The specified font weight.

##### Example Usage

```javascript
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

```html
<!-- Example using fluid typography -->
<h1 class="text-h1">Responsive Heading</h1>
<p class="text-copylg">Responsive Large Copy</p>
```

### Containers

**Containers** adds container utility classes that allow for easy containerisation with responsive padding.

#### Configuration & Usage

##### Configuration

For **Containers**, add the plugin in your `tailwind.config.js`:

```js file=tailwind.config.js
module.exports = {
	plugins: [tailwindFundamentals.containers],
};
```

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
				'800px', // maxWidth
				'1rem', // default padding
				{
					sm: '2rem', // responsive padding applied at 782px vw
				},
			],
      md: {
        '1440px'
        '2rem',
      }
		},
	},
};
```

##### Examples

```html
<!-- Example using containers -->
<div class="container">
	<!-- Content here will have a max-width of 800px and padding left and right of 1rem and 2rem after the 'sm' vw -->
</div>
<div class="container-md">
	<!-- Content here will have a max-width of 1440px and padding left and right of 2rem -->
</div>
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
