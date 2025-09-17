// Local frontend-only configuration and rules reused by DesignProject

// Shared discount tiers
export const DISCOUNTS = [
	{ min: 1000, percent: 15 },
	{ min: 500, percent: 10 },
	{ min: 100, percent: 5 }
];

// Print/Photo Book configs
export const BOOK_SIZES = [
	'Pocket Book (4.25 x 6.875 in / 108 x 175 mm)',
	'Novella (5 x 8 in / 127 x 203 mm)',
	'Digest (5.5 x 8.5 in / 140 x 216 mm)',
	'A5 (5.83 x 8.27 in / 148 x 210 mm)',
	'US Trade (6 x 9 in / 152 x 229 mm)',
	'Royal (6.14 x 9.21 in / 156 x 234 mm)',
	'Executive (7 x 10 in / 178 x 254 mm)',
	'Crown Quarto (7.44 x 9.68 in / 189 x 246 mm)',
	'Small Square (7.5 x 7.5 in / 190 x 190 mm)',
	'A4 (8.27 x 11.69 in / 210 x 297 mm)',
	'Square (8.5 x 8.5 in / 216 x 216 mm)',
	'US Letter (8.5 x 11 in / 216 x 279 mm)',
	'Small Landscape (9 x 7 in / 229 x 178 mm)',
	'US Letter Landscape (11 x 8.5 in / 279 x 216 mm)',
	'A4 Landscape (11.69 x 8.27 in / 297 x 210 mm)'
];

export const BINDING_RULES_BOOK = {
	'Coil Bound': { minPages: 3, maxPages: 470, type: 'paperback' },
	'Saddle Stitch': { minPages: 4, maxPages: 48, type: 'paperback' },
	'Perfect Bound': { minPages: 32, maxPages: 800, type: 'paperback' },
	'Case Wrap': { minPages: 24, maxPages: 800, type: 'hardcover' },
	'Linen Wrap': { minPages: 32, maxPages: 800, type: 'hardcover' }
};

export const SPECIAL_SIZE_RULES = {
	'Small Landscape (9 x 7 in / 229 x 178 mm)': { 'Saddle Stitch': { minPages: 4, maxPages: 48 } },
	'US Letter Landscape (11 x 8.5 in / 279 x 216 mm)': { 'Perfect Bound': { minPages: 32, maxPages: 250 } },
	'A4 Landscape (11.69 x 8.27 in / 297 x 210 mm)': { 'Perfect Bound': { minPages: 32, maxPages: 250 }, 'Saddle Stitch': { minPages: 4, maxPages: 48 } }
};

export const OPTIONS_CONFIG_BOOK = {
	interiorColor: [
		{ name: 'Standard Black and White', dbName: 'Standard Black & White', price: 0.01 },
		{ name: 'Premium Black and White', dbName: 'Premium Black & White', price: 0.02 },
		{ name: 'Standard Color', dbName: 'Standard Color', price: 0.03 },
		{ name: 'Premium Color', dbName: 'Premium Color', price: 0.10 }
	],
	paperType: [
		{ name: '60# Cream Uncoated', dbName: '60# Cream-Uncoated', price: 0.01 },
		{ name: '60# White Uncoated', dbName: '60# White-Uncoated', price: 0.01 },
		{ name: '80# White Coated', dbName: '80# White-Coated', price: 0.02 },
		{ name: '100# White Coated', dbName: '100# White-Coated', price: 0.02 }
	],
	coverFinish: [
		{ name: 'Glossy', dbName: 'Gloss', price: 0.10 },
		{ name: 'Matte', dbName: 'Matte', price: 0.10 }
	]
};

// Size specific pricing (subset sufficient for local calc parity)
export const SIZE_SPECIFIC_PRICING_BOOK = {
	'Pocket Book (4.25 x 6.875 in / 108 x 175 mm)': {
		binding: { 'Perfect Bound': 1.91, 'Saddle Stitch': 3.59, 'Case Wrap': 9.86, 'Linen Wrap': 6.00, 'Coil Bound': 5.90 },
		interiorColor: { 'Standard Black & White': 0.01, 'Premium Black & White': 0.02, 'Standard Color': 0.03, 'Premium Color': 0.04 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.02, '100# White-Coated': 0.02 },
		coverFinish: { 'Gloss': 0.10, 'Matte': 0.10 }
	},
	'Novella (5 x 8 in / 127 x 203 mm)': {
		binding: { 'Perfect Bound': 1.97, 'Saddle Stitch': 3.50, 'Case Wrap': 9.80, 'Linen Wrap': 0, 'Coil Bound': 5.76 },
		interiorColor: { 'Standard Black & White': 0.01, 'Premium Black & White': 0.02, 'Standard Color': 0.03, 'Premium Color': 0.10 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.02, '100# White-Coated': 0.02 },
		coverFinish: { 'Gloss': 0, 'Matte': 0 }
	},
	'Digest (5.5 x 8.5 in / 140 x 216 mm)': {
		binding: { 'Perfect Bound': 1.90, 'Saddle Stitch': 3.50, 'Case Wrap': 9.80, 'Linen Wrap': 13.75, 'Coil Bound': 5.95 },
		interiorColor: { 'Standard Black & White': 0.01, 'Premium Black & White': 0.02, 'Standard Color': 0.03, 'Premium Color': 0.10 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.02, '100# White-Coated': 0.02 },
		coverFinish: { 'Gloss': 0, 'Matte': 0 }
	},
	'A5 (5.83 x 8.27 in / 148 x 210 mm)': {
		binding: { 'Perfect Bound': 1.90, 'Saddle Stitch': 3.46, 'Case Wrap': 9.80, 'Linen Wrap': 13.75, 'Coil Bound': 5.80 },
		interiorColor: { 'Standard Black & White': 0.01, 'Premium Black & White': 0.02, 'Standard Color': 0.03, 'Premium Color': 0.10 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.02, '100# White-Coated': 0.02 },
		coverFinish: { 'Gloss': 0, 'Matte': 0 }
	},
	'US Trade (6 x 9 in / 152 x 229 mm)': {
		binding: { 'Perfect Bound': 1.71, 'Saddle Stitch': 3.46, 'Case Wrap': 9.96, 'Linen Wrap': 13.50, 'Coil Bound': 5.96 },
		interiorColor: { 'Standard Black & White': 0.01, 'Premium Black & White': 0.02, 'Standard Color': 0.03, 'Premium Color': 0.10 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.02, '100# White-Coated': 0.02 },
		coverFinish: { 'Gloss': 0, 'Matte': 0 }
	},
	'Royal (6.14 x 9.21 in / 156 x 234 mm)': {
		binding: { 'Perfect Bound': 1.71, 'Saddle Stitch': 3.46, 'Case Wrap': 9.96, 'Linen Wrap': 13.50, 'Coil Bound': 5.96 },
		interiorColor: { 'Standard Black & White': 0.01, 'Premium Black & White': 0.02, 'Standard Color': 0.03, 'Premium Color': 0.10 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.02, '100# White-Coated': 0.02 },
		coverFinish: { 'Gloss': 0.20, 'Matte': 0.20 }
	},
	'Executive (7 x 10 in / 178 x 254 mm)': {
		binding: { 'Perfect Bound': 2.00, 'Saddle Stitch': 4.10, 'Case Wrap': 10.00, 'Linen Wrap': 13.95, 'Coil Bound': 6.40 },
		interiorColor: { 'Standard Black & White': 0.02, 'Premium Black & White': 0.03, 'Standard Color': 0.04, 'Premium Color': 0.16 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.02, '100# White-Coated': 0.02 },
		coverFinish: { 'Gloss': 0, 'Matte': 0 }
	},
	'Crown Quarto (7.44 x 9.68 in / 189 x 246 mm)': {
		binding: { 'Perfect Bound': 2.00, 'Saddle Stitch': 4.10, 'Case Wrap': 10.00, 'Linen Wrap': 13.95, 'Coil Bound': 6.40 },
		interiorColor: { 'Standard Black & White': 0.02, 'Premium Black & White': 0.03, 'Standard Color': 0.04, 'Premium Color': 0.16 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.02, '100# White-Coated': 0.02 },
		coverFinish: { 'Gloss': 0.05, 'Matte': 0.05 }
	},
	'Small Square (7.5 x 7.5 in / 190 x 190 mm)': {
		binding: { 'Perfect Bound': 2.00, 'Saddle Stitch': 4.10, 'Case Wrap': 10.00, 'Linen Wrap': 13.50, 'Coil Bound': 6.40 },
		interiorColor: { 'Standard Black & White': 0.02, 'Premium Black & White': 0.03, 'Standard Color': 0.04, 'Premium Color': 0.16 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.03, '100# White-Coated': 0.03 },
		coverFinish: { 'Gloss': 0, 'Matte': 0 }
	},
	'A4 (8.27 x 11.69 in / 210 x 297 mm)': {
		binding: { 'Perfect Bound': 2.10, 'Saddle Stitch': 3.82, 'Case Wrap': 9.75, 'Linen Wrap': 13.80, 'Coil Bound': 6.18 },
		interiorColor: { 'Standard Black & White': 0.02, 'Premium Black & White': 0.03, 'Standard Color': 0.04, 'Premium Color': 0.16 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.03, '100# White-Coated': 0.03 },
		coverFinish: { 'Gloss': 0.20, 'Matte': 0.20 }
	},
	'Square (8.5 x 8.5 in / 216 x 216 mm)': {
		binding: { 'Perfect Bound': 2.00, 'Saddle Stitch': 3.82, 'Case Wrap': 9.75, 'Linen Wrap': 13.80, 'Coil Bound': 6.18 },
		interiorColor: { 'Standard Black & White': 0.02, 'Premium Black & White': 0.03, 'Standard Color': 0.04, 'Premium Color': 0.16 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.03, '100# White-Coated': 0.03 },
		coverFinish: { 'Gloss': 0.20, 'Matte': 0.20 }
	},
	'US Letter (8.5 x 11 in / 216 x 279 mm)': {
		binding: { 'Perfect Bound': 2.00, 'Saddle Stitch': 3.82, 'Case Wrap': 9.75, 'Linen Wrap': 13.80, 'Coil Bound': 6.18 },
		interiorColor: { 'Standard Black & White': 0.02, 'Premium Black & White': 0.03, 'Standard Color': 0.04, 'Premium Color': 0.16 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.03, '100# White-Coated': 0.03 },
		coverFinish: { 'Gloss': 0.20, 'Matte': 0.20 }
	},
	'Small Landscape (9 x 7 in / 229 x 178 mm)': {
		binding: { 'Perfect Bound': 2.00, 'Saddle Stitch': 3.82, 'Case Wrap': 9.75, 'Linen Wrap': 13.80, 'Coil Bound': 6.18 },
		interiorColor: { 'Standard Black & White': 0.02, 'Premium Black & White': 0.03, 'Standard Color': 0.04, 'Premium Color': 0.16 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.03, '100# White-Coated': 0.03 },
		coverFinish: { 'Gloss': 0.20, 'Matte': 0.20 }
	},
	'US Letter Landscape (11 x 8.5 in / 279 x 216 mm)': {
		binding: { 'Perfect Bound': 2.00, 'Saddle Stitch': 3.82, 'Case Wrap': 9.75, 'Linen Wrap': 18.00, 'Coil Bound': 6.22 },
		interiorColor: { 'Standard Black & White': 0.02, 'Premium Black & White': 0.03, 'Standard Color': 0.04, 'Premium Color': 0.16 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.03, '100# White-Coated': 0.03 },
		coverFinish: { 'Gloss': 0.10, 'Matte': 0.10 }
	},
	'A4 Landscape (11.69 x 8.27 in / 297 x 210 mm)': {
		binding: { 'Perfect Bound': 2.00, 'Saddle Stitch': 5.00, 'Case Wrap': 9.75, 'Linen Wrap': 13.80, 'Coil Bound': 6.18 },
		interiorColor: { 'Standard Black & White': 0.02, 'Premium Black & White': 0.03, 'Standard Color': 0.04, 'Premium Color': 0.16 },
		paperType: { '60# Cream-Uncoated': 0.01, '60# White-Uncoated': 0.01, '80# White-Coated': 0.03, '100# White-Coated': 0.03 },
		coverFinish: { 'Gloss': 0.10, 'Matte': 0.10 }
	}
};

// Comic Book
export const COMIC_TRIM_SIZES = [
	{ id: 1, name: 'Comic Book (6.625 x 10.25 in / 168 x 260 mm)' },
	{ id: 2, name: 'Larger Deluxe: (7 x 10.875 in / 177.8 mm x 276.23 mm)' },
	{ id: 3, name: 'Manga (Japanese Style Comics): (5 x 7.5 in / 127 mm x 190.5 mm)' }
];

export const COMIC_BINDING_PRICES = {
	1: { 'Perfect Bound': 2.50, 'Saddle Stitch': 5.00, 'Case Wrap': 9.75, 'Linen Wrap': 13.80, 'Coil Bound': 6.18 },
	2: { 'Perfect Bound': 3.00, 'Saddle Stitch': 5.00, 'Case Wrap': 9.75, 'Linen Wrap': 13.80, 'Coil Bound': 6.18 },
	3: { 'Perfect Bound': 2.50, 'Saddle Stitch': 5.00, 'Case Wrap': 9.75, 'Linen Wrap': 13.80, 'Coil Bound': 6.18 }
};

export const COMIC_INTERIOR_COLORS = [
	{ name: 'Premium Black & White', dbName: 'Premium Black & White', price: 0.0325 },
	{ name: 'Premium Color', dbName: 'Premium Color', price: 0.19 }
];

export const COMIC_PAPER_TYPES = [
	{ name: '70# White-Uncoated', dbName: '70# White-Uncoated', price: 0.02 },
	{ name: '60# Cream-Uncoated', dbName: '60# Cream-Uncoated', price: 0.01 },
	{ name: '60# White-Uncoated', dbName: '60# White-Uncoated', price: 0.01 },
	{ name: '80# White-Coated', dbName: '80# White-Coated', price: 0.03 }
];

export const COMIC_COVER_FINISHES = [
	{ name: 'Gloss', dbName: 'Gloss', price: 0.00 },
	{ name: 'Matte', dbName: 'Matte', price: 0.00 }
];

export const BINDING_RULES_COMIC = {
	'Coil Bound': { minPages: 3, type: 'paperback' },
	'Saddle Stitch': { minPages: 4, type: 'paperback' },
	'Perfect Bound': { minPages: 32, type: 'paperback' },
	'Case Wrap': { minPages: 24, type: 'hardcover' },
	'Linen Wrap': { minPages: 32, type: 'hardcover' }
};

// Magazine/Year Book
export const SIMPLE_TRIM_SIZES = [
	'A4 (8.27 x 11.69 in / 210 x 297 mm)',
	'US Letter (8.5 x 11 in / 216 x 279 mm)'
];

export const BINDING_CONFIGS_SIMPLE = {
	'Perfect Bound': { price: 2.50 },
	'Coil Bound': { price: 6.18 },
	'Saddle Stitch': { price: 5.00 },
	'Case Wrap': { price: 9.75 },
	'Linen Wrap': { price: 13.80 }
};

export const OPTIONS_CONFIG_SIMPLE = {
	interiorColor: [
		{ name: 'Standard Black & White', dbName: 'Standard Black & White', price: 0.015 },
		{ name: 'Premium Black & White', dbName: 'Premium Black & White', price: 0.03 },
		{ name: 'Standard Color', dbName: 'Standard Color', price: 0.12 },
		{ name: 'Premium Color', dbName: 'Premium Color', price: 0.19 }
	],
	paperType: [
		{ name: '60# Cream-Uncoated', dbName: '60# Cream-Uncoated', price: 0.01 },
		{ name: '60# White-Uncoated', dbName: '60# White-Uncoated', price: 0.01 },
		{ name: '70# White-Uncoated', dbName: '70# White-Uncoated', price: 0.02 },
		{ name: '80# White-Coated', dbName: '80# White-Coated', price: 0.03 }
	],
	coverFinish: [
		{ name: 'Gloss', dbName: 'Gloss', price: 0.00 },
		{ name: 'Matte', dbName: 'Matte', price: 0.00 }
	]
};

// Calendar
export const CALENDAR_SIZES = [
	'Comic Book (6.625 x 10.25 in / 168 x 260 mm)',
	'US Letter Landscape (11 x 8.5 in / 279 x 216 mm)',
	'A4 Landscape (11.69 x 8.27 in / 297 x 210 mm)',
	'Square (8.5 x 8.5 in / 216 x 216 mm)',
	'Small Square (7.5 x 7.5 in / 190 x 190 mm)'
];

export const CALENDAR_OPTIONS = {
	bindingType: [ { name: 'Wire O', dbName: 'Wire O', price: 12.00 } ],
	interiorColor: [ { name: 'Premium Color', dbName: 'Premium Color', price: 0.00 } ],
	paperType: [ { name: '100# White-Coated', dbName: '100# White-Coated', price: 0.00 } ],
	coverFinish: [ { name: 'Gloss', dbName: 'Gloss', price: 0.00 }, { name: 'Matte', dbName: 'Matte', price: 0.00 } ]
};


