/**
 *
 * Tailwind CSS - Fundamentals
 * Author: James Gawn
 *
 * A Tailwind CSS plugin that can be used to extend the functionality of Tailwind CSS.
 *
 */

/**
 * Tailwind CSS plugin module.
 *
 * This module imports the Tailwind CSS plugin functionality.
 *
 * @module tailwindcss/plugin
 */
const plugin = require('tailwindcss/plugin');

/**
 * Calculates fluid typography settings for responsive design.
 *
 * This function generates CSS clamp values for fluid font sizes and line heights 
 * that adapt to the viewport width, allowing for a responsive typography experience.
 *
 * @param {number|string} minValue - The minimum font size. If an integer is provided, it is assumed to be in pixels. 
 *                                   If a string is provided with a `rem` suffix, it will be treated as such.
 * @param {number|string} maxValue - The maximum font size. Similar to `minValue`, can be provided as an integer or a `rem` value.
 * @param {number|string} minLineHeight - The minimum line height value. Accepts integers (assumed as pixels) or `rem` values.
 * @param {number|string} maxLineHeight - The maximum line height value. Same format as `minLineHeight`.
 * @param {string} [letterSpacing='0'] - The letter spacing to be applied. Defaults to `0`.
 * @param {string} [fontWeight='400'] - The font weight to be applied. Defaults to `400`.
 * @param {number|string} [minWidth=320] - The minimum viewport width at which font scaling begins. Defaults to `320`. 
 *                                           Can be provided as an integer (assumed in pixels) or `rem`.
 * @param {number|string} [maxWidth=1920] - The maximum viewport width at which font scaling ends. Defaults to `1920`. 
 *                                            Same format as `minWidth`.
 *
 * @returns {[string, Object]} An array containing:
 *  - A string representing the CSS clamp function for the fluid font size.
 *  - An object with the following properties:
 *    - `lineHeight`: A string for the clamp value of line height.
 *    - `letterSpacing`: The specified letter spacing.
 *    - `fontWeight`: The specified font weight.
 *
 * @example
 * module.exports = {
 *	theme: {
 *		extend: {
 *			fontSize: {
 *				h1: tailwindFundamentals.fluidType(30, 40, 36, 46, 0, 400, 320, 1920),
 *			},
 *		},
 * 	},
 * };
 */
const fluidType = (
  minValue, 
  maxValue, 
  minLineHeight, 
  maxLineHeight, 
  letterSpacing = 0, 
  fontWeight = 400,
	minWidth = 320, 
  maxWidth = 1920, 
) => {
  const convertToRem = (value) => {
    if (typeof value === 'number') return value / 16; // Assume pixel
    if (typeof value === 'string' && value.endsWith('rem')) return parseFloat(value);
    return parseFloat(value) / 16; // Assume pixel for px or fallback
  };

  const convertToPixels = (value) => {
    if (typeof value === 'number') return value; // Assume already in pixels
    if (typeof value === 'string' && value.endsWith('rem')) return parseFloat(value) * 16;
    return parseFloat(value); // Keep as pixels
  };

  const minValueRem = convertToRem(minValue);
  const maxValueRem = convertToRem(maxValue);
  const minLineHeightRem = convertToRem(minLineHeight);
  const maxLineHeightRem = convertToRem(maxLineHeight);
  const minWidthPx = convertToPixels(minWidth);
  const maxWidthPx = convertToPixels(maxWidth);

  const calculateClamp = (min, max, minSize, maxSize, minW, maxW) => {
    const factor = (maxSize - minSize) / (maxW - minW);
    const fluidValue = ((maxSize * 16 - minSize * 16) / (maxW - minW)) * 100;
    return `clamp(${Math.min(minSize, maxSize)}rem, ${minSize - minW * factor}rem + ${fluidValue}vw, ${Math.max(minSize, maxSize)}rem)`;
  };

  const fontClamp = calculateClamp(minValueRem, maxValueRem, minValueRem, maxValueRem, minWidthPx, maxWidthPx);
  const lineClamp = calculateClamp(minLineHeightRem, maxLineHeightRem, minLineHeightRem, maxLineHeightRem, minWidthPx, maxWidthPx);

  return [
    fontClamp, 
    {
      lineHeight: lineClamp,
      letterSpacing,
      fontWeight,
    }
  ];
};


/**
 * A Tailwind CSS plugin to create a custom container component.
 *
 * @param {function} addComponents - Function to add custom components to Tailwind CSS.
 */
const containers = plugin(function ({ addComponents, theme }) {
	const containers = theme('containers');

	Object.keys(containers).forEach((containerKey) => {
		const [maxWidth, basePadding, responsivePadding] = containers[containerKey];

		const baseStyles = {
			maxWidth: maxWidth,
			width: '100%',
			marginLeft: 'auto',
			marginRight: 'auto',
			paddingLeft: basePadding,
			paddingRight: basePadding,
		};

		const responsiveStyles = Object.entries(responsivePadding).reduce((acc, [screenSize, screenPadding]) => {
			acc[`@media (min-width: ${theme(`screens.${screenSize}`)})`] = {
				paddingLeft: screenPadding,
				paddingRight: screenPadding,
			};
			return acc;
		}, {});

		// Check if container key is 'DEFAULT', use '.container' class instead of '.container--DEFAULT'
		const className = containerKey === 'DEFAULT' ? '.container' : `.container--${containerKey}`;

		// Define container class with 'container--' prefix and the container key, or just 'container' for DEFAULT
		addComponents({
			[className]: {
				...baseStyles,
				...responsiveStyles,
			},
		});
	});
});

/**
 * A Tailwind CSS plugin that generates custom utility classes for spacing properties 
 * based on a defined range. The generated classes support height, width, margin, 
 * and padding utilities, as well as gap properties and inset values, allowing for consistent spacing 
 * throughout the application.
 *
 * @function customSpacing
 * @param {Object} options - The options object.
 * @param {Function} options.addUtilities - A function to add custom utilities.
 * @param {Function} options.e - A function to escape class names.
 * @param {Function} options.theme - A function to access theme values.
 *
 * @example
 * // To use this plugin in a Tailwind CSS configuration:
 * const customSpacing = require('./path/to/customSpacing');
 * 
 * module.exports = {
 *   plugins: [
 *     customSpacing,
 *   ],
 * };
 *
 * The following utility classes will be generated:
 * - Height: .h-1, .h-2, ..., .h-150
 * - Width: .w-1, .w-2, ..., .w-150
 * - Margin: .m-1, .m-2, ..., .m-150
 * - Padding: .p-1, .p-2, ..., .p-150
 * - And more for other spacing properties.
 *
 * @returns {void} This function does not return a value. It adds the utilities directly to the Tailwind CSS build.
 */
const customSpacing = plugin(function ({ addUtilities, e, theme }) {
	const max = theme('spacing.MAX', 150); // Provide a default value of 150
	const properties = [
		{ prefix: 'h', prop: 'height' },
		{ prefix: 'min-h', prop: 'minHeight' },
		{ prefix: 'max-h', prop: 'maxHeight' },
		{ prefix: 'w', prop: 'width' },
		{ prefix: 'min-w', prop: 'minWidth' },
		{ prefix: 'max-w', prop: 'maxWidth' },
		{ prefix: 'm', prop: 'margin' },
		{ prefix: '-m', prop: 'margin' },
		{ prefix: 'mt', prop: 'marginTop' },
		{ prefix: '-mt', prop: 'marginTop' },
		{ prefix: 'mr', prop: 'marginRight' },
		{ prefix: '-mr', prop: 'marginRight' },
		{ prefix: 'ml', prop: 'marginLeft' },
		{ prefix: '-ml', prop: 'marginLeft' },
		{ prefix: 'mb', prop: 'marginBottom' },
		{ prefix: '-mb', prop: 'marginBottom' },
		{ prefix: 'my', prop: ['marginTop', 'marginBottom'] },
		{ prefix: '-my', prop: ['marginTop', 'marginBottom'] },
		{ prefix: 'mx', prop: ['marginLeft', 'marginRight'] },
		{ prefix: '-mx', prop: ['marginLeft', 'marginRight'] },
		{ prefix: 'p', prop: 'padding' },
		{ prefix: '-p', prop: 'padding' },
		{ prefix: 'pt', prop: 'paddingTop' },
		{ prefix: '-pt', prop: 'paddingTop' },
		{ prefix: 'pr', prop: 'paddingRight' },
		{ prefix: '-pr', prop: 'paddingRight' },
		{ prefix: 'pl', prop: 'paddingLeft' },
		{ prefix: '-pl', prop: 'paddingLeft' },
		{ prefix: 'pb', prop: 'paddingBottom' },
		{ prefix: '-pb', prop: 'paddingBottom' },
		{ prefix: 'py', prop: ['paddingTop', 'paddingBottom'] },
		{ prefix: '-py', prop: ['paddingTop', 'paddingBottom'] },
		{ prefix: 'px', prop: ['paddingLeft', 'paddingRight'] },
		{ prefix: '-px', prop: ['paddingLeft', 'paddingRight'] },
		{ prefix: 'gap', prop: 'gap' },
		{ prefix: 'gap-x', prop: 'columnGap' },
		{ prefix: 'gap-y', prop: 'rowGap' },
		{ prefix: 'top', prop: 'top' },
		{ prefix: 'left', prop: 'left' },
		{ prefix: 'right', prop: 'right' },
		{ prefix: 'bottom', prop: 'bottom' },
		{ prefix: 'inset', prop: 'inset' },
	];

	for (let i = 1; i <= max; i++) {
		let remValue = `${i / 16}rem`;
		let newUtilities = properties.reduce((acc, { prefix, prop }) => {
			let value = prefix.startsWith('-') ? `-${remValue}` : remValue;
			if (Array.isArray(prop)) {
				acc[`.${prefix}-${i}`] = prop.reduce((innerAcc, p) => {
					innerAcc[p] = value;
					return innerAcc;
				}, {});
			} else {
				acc[`.${e(`${prefix}-${i}`)}`] = { [prop]: value };
			}
			return acc;
		}, {});
		addUtilities(newUtilities);
	}
});

module.exports = { fluidType, containers, customSpacing };
