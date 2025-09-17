// Local pricing calculators that mirror page-specific logic
import {
	DISCOUNTS,
	BINDING_RULES_BOOK,
	SPECIAL_SIZE_RULES,
	SIZE_SPECIFIC_PRICING_BOOK,
	COMIC_BINDING_PRICES,
	OPTIONS_CONFIG_BOOK,
	COMIC_INTERIOR_COLORS,
	COMIC_PAPER_TYPES,
	COMIC_COVER_FINISHES,
	BINDING_CONFIGS_SIMPLE,
	OPTIONS_CONFIG_SIMPLE,
	CALENDAR_OPTIONS
} from './config';

export const getAvailableBindingsBook = (pageCount, bookSize) => {
	if (!pageCount || pageCount < 2) return [];
	const specialRules = SPECIAL_SIZE_RULES[bookSize];
	return Object.entries(BINDING_RULES_BOOK).reduce((acc, [bindingName, generalRule]) => {
		const rule = specialRules?.[bindingName] || generalRule;
		if (pageCount >= rule.minPages && pageCount <= rule.maxPages) acc.push(bindingName);
		return acc;
	}, []);
};

export const calculatePriceBook = ({ bookSize, page_count, binding_id, interior_color_id, paper_type_id, cover_finish_id, quantity }) => {
	if (!bookSize || !page_count || !binding_id || !interior_color_id || !paper_type_id || !cover_finish_id || quantity <= 0) return null;
	const sizePricing = SIZE_SPECIFIC_PRICING_BOOK[bookSize];
	if (!sizePricing) return null;
	const unitPrice =
		(sizePricing.binding[binding_id] || 0) +
		((sizePricing.interiorColor[interior_color_id] || 0) * page_count) +
		((sizePricing.paperType[paper_type_id] || 0) * page_count) +
		(sizePricing.coverFinish[cover_finish_id] || 0);
	const totalPrice = unitPrice * quantity;
	const discount = DISCOUNTS.find(d => quantity >= d.min);
	const discountAmount = discount ? totalPrice * (discount.percent / 100) : 0;
	return {
		unitPrice: Number(unitPrice.toFixed(2)),
		totalPrice: Number(totalPrice.toFixed(2)),
		discountAmount: Number(discountAmount.toFixed(2)),
		discountPercent: discount?.percent || 0,
		finalPrice: Number((totalPrice - discountAmount).toFixed(2))
	};
};

export const getAvailableBindingsComic = (pageCount) => {
	if (!pageCount || pageCount < 3) return [];
	return ['Coil Bound', 'Saddle Stitch', 'Perfect Bound', 'Case Wrap', 'Linen Wrap'].filter(name => {
		if (name === 'Coil Bound') return pageCount >= 3;
		if (name === 'Saddle Stitch') return pageCount >= 4;
		if (name === 'Perfect Bound') return pageCount >= 32;
		if (name === 'Case Wrap') return pageCount >= 24;
		if (name === 'Linen Wrap') return pageCount >= 32;
		return false;
	});
};

export const calculatePriceComic = ({ trim_size_id, page_count, binding_id, interior_color_id, paper_type_id, cover_finish_id, quantity }) => {
	if (!trim_size_id || !page_count || !binding_id || !interior_color_id || !paper_type_id || !cover_finish_id || quantity <= 0) return null;
	const bindingPrice = COMIC_BINDING_PRICES[Number(trim_size_id)]?.[binding_id] || 0;
	const interiorColorPrice = COMIC_INTERIOR_COLORS.find(ic => ic.dbName === interior_color_id)?.price || 0;
	const paperTypePrice = COMIC_PAPER_TYPES.find(pt => pt.dbName === paper_type_id)?.price || 0;
	const coverFinishPrice = COMIC_COVER_FINISHES.find(cf => cf.dbName === cover_finish_id)?.price || 0;
	const unitPrice = bindingPrice + (interiorColorPrice * page_count) + (paperTypePrice * page_count) + coverFinishPrice;
	const totalPrice = unitPrice * quantity;
	const discount = DISCOUNTS.find(d => quantity >= d.min);
	const discountAmount = discount ? totalPrice * (discount.percent / 100) : 0;
	return {
		unitPrice: Number(unitPrice.toFixed(2)),
		totalPrice: Number(totalPrice.toFixed(2)),
		discountAmount: Number(discountAmount.toFixed(2)),
		discountPercent: discount?.percent || 0,
		finalPrice: Number((totalPrice - discountAmount).toFixed(2))
	};
};

export const getAvailableBindingsSimple = (pageCount) => {
	if (!pageCount || pageCount < 3) return [];
	if (pageCount >= 32) return ['Perfect Bound', 'Coil Bound', 'Saddle Stitch', 'Case Wrap', 'Linen Wrap'];
	if (pageCount >= 24) return ['Coil Bound', 'Saddle Stitch', 'Case Wrap'];
	if (pageCount >= 4) return ['Coil Bound', 'Saddle Stitch'];
	return ['Coil Bound'];
};

export const calculatePriceSimple = ({ page_count, binding_id, interior_color_id, paper_type_id, cover_finish_id, quantity }) => {
	if (!page_count || !binding_id || !interior_color_id || !paper_type_id || !cover_finish_id || quantity <= 0) return null;
	const bindingPrice = BINDING_CONFIGS_SIMPLE[binding_id]?.price || 0;
	const interiorColorOption = OPTIONS_CONFIG_SIMPLE.interiorColor.find(opt => opt.dbName === interior_color_id);
	const paperTypeOption = OPTIONS_CONFIG_SIMPLE.paperType.find(opt => opt.dbName === paper_type_id);
	const coverFinishOption = OPTIONS_CONFIG_SIMPLE.coverFinish.find(opt => opt.dbName === cover_finish_id);
	const interiorColorPrice = (interiorColorOption?.price || 0) * page_count;
	const paperTypePrice = (paperTypeOption?.price || 0) * page_count;
	const coverFinishPrice = coverFinishOption?.price || 0;
	const unitPrice = bindingPrice + interiorColorPrice + paperTypePrice + coverFinishPrice;
	const totalPrice = unitPrice * quantity;
	const discount = DISCOUNTS.find(d => quantity >= d.min);
	const discountAmount = discount ? totalPrice * (discount.percent / 100) : 0;
	return {
		unitPrice: Number(unitPrice.toFixed(2)),
		totalPrice: Number(totalPrice.toFixed(2)),
		discountAmount: Number(discountAmount.toFixed(2)),
		discountPercent: discount?.percent || 0,
		finalPrice: Number((totalPrice - discountAmount).toFixed(2))
	};
};

export const calculatePriceCalendar = ({ binding_id, interior_color_id, paper_type_id, cover_finish_id, quantity }) => {
	if (!binding_id || !interior_color_id || !paper_type_id || !cover_finish_id || quantity <= 0) return null;
	const binding = CALENDAR_OPTIONS.bindingType.find(o => o.dbName === binding_id)?.price || 0;
	const interior = CALENDAR_OPTIONS.interiorColor.find(o => o.dbName === interior_color_id)?.price || 0;
	const paper = CALENDAR_OPTIONS.paperType.find(o => o.dbName === paper_type_id)?.price || 0;
	const finish = CALENDAR_OPTIONS.coverFinish.find(o => o.dbName === cover_finish_id)?.price || 0;
	const unitPrice = binding + interior + paper + finish;
	const totalPrice = unitPrice * quantity;
	const discount = DISCOUNTS.find(d => quantity >= d.min);
	const discountAmount = discount ? totalPrice * (discount.percent / 100) : 0;
	return {
		unitPrice: Number(unitPrice.toFixed(2)),
		totalPrice: Number(totalPrice.toFixed(2)),
		discountAmount: Number(discountAmount.toFixed(2)),
		discountPercent: discount?.percent || 0,
		finalPrice: Number((totalPrice - discountAmount).toFixed(2))
	};
};


