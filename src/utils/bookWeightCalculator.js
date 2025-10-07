// Book Weight and Shipping Calculator based on Fast Print Guys specifications

// Book size dimensions and specifications
const BOOK_SPECIFICATIONS = {
  'Pocket Book (4.25 x 6.875 in / 108 x 175 mm)': {
    width: 4.25,
    length: 6.875,
    displayName: 'Pocket Book'
  },
  'Novella (5 x 8 in / 127 x 203 mm)': {
    width: 5,
    length: 8,
    displayName: 'Novella'
  },
  'Digest (5.5 x 8.5 in / 140 x 216 mm)': {
    width: 5.5,
    length: 8.5,
    displayName: 'Digest'
  },
  'A5 (5.83 x 8.27 in / 148 x 210 mm)': {
    width: 5.83,
    length: 8.27,
    displayName: 'A5'
  },
  'US Trade (6 x 9 in / 152 x 229 mm)': {
    width: 6,
    length: 9,
    displayName: 'US Trade'
  },
  'Royal (6.14 x 9.21 in / 156 x 234 mm)': {
    width: 6.14,
    length: 9.21,
    displayName: 'Royal'
  },
  'Executive (7 x 10 in / 178 x 254 mm)': {
    width: 7,
    length: 10,
    displayName: 'Executive'
  },
  'Crown Quarto (7.44 x 9.68 in / 189 x 246 mm)': {
    width: 7.44,
    length: 9.68,
    displayName: 'Crown Quarto'
  },
  'Small Square (7.5 x 7.5 in / 190 x 190 mm)': {
    width: 7.5,
    length: 7.5,
    displayName: 'Small Square'
  },
  'A4 (8.27 x 11.69 in / 210 x 297 mm)': {
    width: 8.27,
    length: 11.69,
    displayName: 'A4'
  },
  'Square (8.5 x 8.5 in / 216 x 216 mm)': {
    width: 8.5,
    length: 8.5,
    displayName: 'Square'
  },
  'US Letter (8.5 x 11 in / 216 x 279 mm)': {
    width: 8.5,
    length: 11,
    displayName: 'US Letter'
  },
  'Small Landscape (9 x 7 in / 229 x 178 mm)': {
    width: 9,
    length: 7,
    displayName: 'Small Landscape'
  },
  'US Letter Landscape (11 x 8.5 in / 279 x 216 mm)': {
    width: 11,
    length: 8.5,
    displayName: 'US Letter Landscape'
  },
  'A4 Landscape (11.69 x 8.27 in / 297 x 210 mm)': {
    width: 11.69,
    length: 8.27,
    displayName: 'A4 Landscape'
  },
  // Comic Book Sizes
  'Comic Book (6.625 x 10.25 in / 168 x 260 mm)': {
    width: 6.625,
    length: 10.25,
    displayName: 'Comic Book'
  },
  'Larger Deluxe: (7 x 10.875 in / 177.8 mm x 276.23 mm)': {
    width: 7,
    length: 10.875,
    displayName: 'Larger Deluxe'
  },
  'Manga (Japanese Style Comics): (5 x 7.5 in / 127 mm x 190.5 mm)': {
    width: 5,
    length: 7.5,
    displayName: 'Manga'
  },
  // Thesis Binding Sizes
  'A4 (8.27 x 11.69 in / 210 x 297 mm)': {
    width: 8.27,
    length: 11.69,
    displayName: 'A4'
  },
  'US Letter (8.5 x 11 in / 216 x 279 mm)': {
    width: 8.5,
    length: 11,
    displayName: 'US Letter'
  },
  // YearBook Sizes
  'US Letter Landscape (11 x 8.5 in / 279 x 216 mm)': {
    width: 11,
    length: 8.5,
    displayName: 'US Letter Landscape'
  },
  'A4 Landscape (11.69 x 8.27 in / 297 x 210 mm)': {
    width: 11.69,
    length: 8.27,
    displayName: 'A4 Landscape'
  }
};

// Paper specifications
const PAPER_SPECIFICATIONS = {
  '60# Cream-Uncoated': {
    thickness: 0.0046,
    weight: 0.0126,
    coated: false,
    displayName: '60lb Uncoated'
  },
  '60# White-Uncoated': {
    thickness: 0.0046,
    weight: 0.0126,
    coated: false,
    displayName: '60lb Uncoated'
  },
  '80# White-Coated': {
    thickness: 0.0045,
    weight: 0.016,
    coated: true,
    displayName: '80lb Coated'
  },
  '100# White-Coated': {
    thickness: 0.0052,
    weight: 0.0155,
    coated: true,
    displayName: '70lb Uncoated' // Based on thickness, this seems to be 70lb
  },
  // Comic Book Paper Types
  '70# White-Uncoated': {
    thickness: 0.0052,
    weight: 0.0155,
    coated: false,
    displayName: '70lb Uncoated'
  },
  // Thesis Binding Paper Types
  '70_white_uncoated': {
    thickness: 0.0052,
    weight: 0.0155,
    coated: false,
    displayName: '70lb White Uncoated'
  },
  '60_cream_uncoated': {
    thickness: 0.0046,
    weight: 0.0126,
    coated: false,
    displayName: '60lb Cream Uncoated'
  },
  '60_white_uncoated': {
    thickness: 0.0046,
    weight: 0.0126,
    coated: false,
    displayName: '60lb White Uncoated'
  },
  '80_white_coated': {
    thickness: 0.0045,
    weight: 0.016,
    coated: true,
    displayName: '80lb White Coated'
  },
  // YearBook Paper Types
  '60# White-uncoated': {
    thickness: 0.0046,
    weight: 0.0126,
    coated: false,
    displayName: '60lb White Uncoated'
  },
  // Magazine Paper Types
  '60# White-Uncoated': {
    thickness: 0.0046,
    weight: 0.0126,
    coated: false,
    displayName: '60lb White Uncoated'
  },
  // PhotoBook Paper Types
  '60# Cream-Uncoated': {
    thickness: 0.0046,
    weight: 0.0126,
    coated: false,
    displayName: '60lb Cream Uncoated'
  },
  '100# White-Coated': {
    thickness: 0.0055,
    weight: 0.021,
    coated: true,
    displayName: '100lb White Coated'
  }
};

// Binding specifications
const BINDING_SPECIFICATIONS = {
  'Perfect Bound': {
    buffer: 0.5,
    type: 'Paperback',
    displayName: 'Paperback'
  },
  'Saddle Stitch': {
    buffer: 1.8,
    type: 'Thesis',
    displayName: 'Thesis'
  },
  'Coil Bound': {
    buffer: 0.5,
    type: 'Coil',
    displayName: 'Coil'
  },
  'Case Wrap': {
    buffer: 1.2,
    type: 'Hardcover',
    displayName: 'Hardcover'
  },
  'Linen Wrap': {
    buffer: 1.5,
    type: 'Hardcover',
    displayName: 'Hardcover'
  },
  // Thesis Binding Types
  'leather_case_wrap': {
    buffer: 2.0,
    type: 'Hardcover',
    displayName: 'Leather Case Wrap'
  },
  'faux_leather_case_wrap': {
    buffer: 1.8,
    type: 'Hardcover',
    displayName: 'Faux Leather Case Wrap'
  },
  'polythin_rexine_case_wrap': {
    buffer: 1.5,
    type: 'Hardcover',
    displayName: 'Polythin Rexine Case Wrap'
  }
};

// Package specifications
const PACKAGE_SPECIFICATIONS = {
  envelope: {
    '11x9x1': { maxBooks: 1, dimensions: '11x9x1' },
    '13x10x1': { maxBooks: 1, dimensions: '13x10x1' },
    '13x10x2': { maxBooks: 1, dimensions: '13x10x2' }
  },
  box: {
    '12x12x12': { maxBooks: 23, dimensions: '12x12x12' },
    '14x14x14': { maxBooks: 23, dimensions: '14x14x14' }
  }
};

/**
 * Calculate book weight and packaging requirements
 * @param {Object} bookSpecs - Book specifications
 * @param {string} bookSpecs.bookSize - Book size (e.g., "Pocket Book (4.25 x 6.875 in / 108 x 175 mm)")
 * @param {number} bookSpecs.pageCount - Number of pages
 * @param {string} bookSpecs.paperType - Paper type (e.g., "60# Cream-Uncoated")
 * @param {string} bookSpecs.bindingType - Binding type (e.g., "Perfect Bound")
 * @param {number} bookSpecs.quantity - Number of books
 * @returns {Object} Weight and packaging information
 */
export const calculateBookWeight = (bookSpecs) => {
  const { bookSize, pageCount, paperType, bindingType, quantity } = bookSpecs;

  // Get specifications
  const sizeSpec = BOOK_SPECIFICATIONS[bookSize];
  const paperSpec = PAPER_SPECIFICATIONS[paperType];
  const bindingSpec = BINDING_SPECIFICATIONS[bindingType];

  if (!sizeSpec || !paperSpec || !bindingSpec) {
    throw new Error('Invalid book specifications provided');
  }

  // Calculate spine thickness (height)
  const spineThickness = (pageCount * paperSpec.thickness) + 0.1; // Adding small buffer

  // Calculate volume in cubic inches
  const volume = sizeSpec.width * sizeSpec.length * spineThickness;

  // Calculate weight per book in pounds
  const paperWeight = pageCount * paperSpec.weight;
  const weightPerBook = paperWeight + bindingSpec.buffer;

  // Calculate total weight
  const totalWeight = weightPerBook * quantity;

  // Determine packaging requirements
  let packagingInfo = determinePackaging(quantity, totalWeight, volume);

  return {
    bookSize: sizeSpec.displayName,
    pageCount,
    paperType: paperSpec.displayName,
    bindingType: bindingSpec.displayName,
    spineThickness: parseFloat(spineThickness.toFixed(3)),
    volume: parseFloat(volume.toFixed(1)),
    weightPerBook: parseFloat(weightPerBook.toFixed(2)),
    quantity,
    totalWeight: parseFloat(totalWeight.toFixed(2)),
    packaging: packagingInfo
  };
};

/**
 * Determine packaging requirements based on quantity and weight
 * @param {number} quantity - Number of books
 * @param {number} totalWeight - Total weight in pounds
 * @param {number} volume - Volume per book
 * @returns {Object} Packaging information
 */
const determinePackaging = (quantity, totalWeight, volume) => {
  // For single books or light packages, use envelopes
  if (quantity === 1 && totalWeight <= 2) {
    if (volume <= 50) {
      return {
        type: 'Envelope',
        size: '11x9x1',
        booksPerPackage: 1,
        packagesNeeded: 1
      };
    } else {
      return {
        type: 'Envelope',
        size: '13x10x1',
        booksPerPackage: 1,
        packagesNeeded: 1
      };
    }
  }

  // For multiple books or heavier packages, use boxes
  const maxBooksPerBox = 23; // Standard box capacity
  const packagesNeeded = Math.ceil(quantity / maxBooksPerBox);
  
  return {
    type: 'Box',
    size: totalWeight > 25 ? '14x14x14' : '12x12x12',
    booksPerPackage: Math.min(quantity, maxBooksPerBox),
    packagesNeeded
  };
};

/**
 * Calculate shipping weight multiplier based on packaging
 * This can be used to adjust shipping rates based on actual package requirements
 * @param {Object} packaging - Packaging information from calculateBookWeight
 * @returns {number} Weight multiplier for shipping calculations
 */
export const getShippingWeightMultiplier = (packaging) => {
  const baseMultiplier = 1.0;
  
  // Add packaging weight
  if (packaging.type === 'Box') {
    return baseMultiplier + (packaging.packagesNeeded * 0.5); // Add 0.5 lbs per box
  } else {
    return baseMultiplier + (packaging.packagesNeeded * 0.1); // Add 0.1 lbs per envelope
  }
};

/**
 * Get simplified book specifications for display
 * @param {Object} bookSpecs - Book specifications from form
 * @returns {Object} Simplified specs for shipping calculation
 */
export const getBookSpecsForShipping = (formData) => {
  // Handle PrintBook format
  if (formData.bookSize && formData.page_count && formData.binding_id && 
      formData.paper_type_id && formData.quantity) {
    try {
      const weightInfo = calculateBookWeight({
        bookSize: formData.bookSize,
        pageCount: parseInt(formData.page_count),
        paperType: formData.paper_type_id,
        bindingType: formData.binding_id,
        quantity: parseInt(formData.quantity)
      });

      return {
        totalWeight: weightInfo.totalWeight,
        packaging: weightInfo.packaging,
        dimensions: {
          length: BOOK_SPECIFICATIONS[formData.bookSize]?.length || 0,
          width: BOOK_SPECIFICATIONS[formData.bookSize]?.width || 0,
          height: weightInfo.spineThickness
        },
        quantity: weightInfo.quantity,
        description: `${weightInfo.quantity}x ${weightInfo.bookSize} (${weightInfo.pageCount} pages, ${weightInfo.bindingType})`
      };
    } catch (error) {
      console.error('Error calculating book specifications:', error);
      return null;
    }
  }
  
  // Handle ComicBook format
  if (formData.trim_size_id && formData.page_count && formData.binding_id && 
      formData.paper_type_id && formData.quantity) {
    try {
      // Map comic book trim size ID to book size name
      const trimSizeMap = {
        1: 'Comic Book (6.625 x 10.25 in / 168 x 260 mm)',
        2: 'Larger Deluxe: (7 x 10.875 in / 177.8 mm x 276.23 mm)',
        3: 'Manga (Japanese Style Comics): (5 x 7.5 in / 127 mm x 190.5 mm)'
      };
      
      const bookSize = trimSizeMap[parseInt(formData.trim_size_id)];
      if (!bookSize) return null;
      
      const weightInfo = calculateBookWeight({
        bookSize: bookSize,
        pageCount: parseInt(formData.page_count),
        paperType: formData.paper_type_id,
        bindingType: formData.binding_id,
        quantity: parseInt(formData.quantity)
      });

      return {
        totalWeight: weightInfo.totalWeight,
        packaging: weightInfo.packaging,
        dimensions: {
          length: BOOK_SPECIFICATIONS[bookSize]?.length || 0,
          width: BOOK_SPECIFICATIONS[bookSize]?.width || 0,
          height: weightInfo.spineThickness
        },
        quantity: weightInfo.quantity,
        description: `${weightInfo.quantity}x ${weightInfo.bookSize} (${weightInfo.pageCount} pages, ${weightInfo.bindingType})`
      };
    } catch (error) {
      console.error('Error calculating comic book specifications:', error);
      return null;
    }
  }
  
  // Handle Thesis Binding format
  if (formData.bookSize && formData.pageCount && formData.binding_id && 
      formData.paper_type_id && formData.quantity) {
    try {
      const weightInfo = calculateBookWeight({
        bookSize: formData.bookSize,
        pageCount: parseInt(formData.pageCount),
        paperType: formData.paper_type_id,
        bindingType: formData.binding_id,
        quantity: parseInt(formData.quantity)
      });

      return {
        totalWeight: weightInfo.totalWeight,
        packaging: weightInfo.packaging,
        dimensions: {
          length: BOOK_SPECIFICATIONS[formData.bookSize]?.length || 0,
          width: BOOK_SPECIFICATIONS[formData.bookSize]?.width || 0,
          height: weightInfo.spineThickness
        },
        quantity: weightInfo.quantity,
        description: `${weightInfo.quantity}x ${weightInfo.bookSize} (${weightInfo.pageCount} pages, ${weightInfo.bindingType})`
      };
    } catch (error) {
      console.error('Error calculating thesis binding specifications:', error);
      return null;
    }
  }
  
  // Handle YearBook format
  if (formData.trim_size_id && formData.page_count && formData.binding_id && 
      formData.paper_type_id && formData.quantity) {
    try {
      const weightInfo = calculateBookWeight({
        bookSize: formData.trim_size_id,
        pageCount: parseInt(formData.page_count),
        paperType: formData.paper_type_id,
        bindingType: formData.binding_id,
        quantity: parseInt(formData.quantity)
      });

      return {
        totalWeight: weightInfo.totalWeight,
        packaging: weightInfo.packaging,
        dimensions: {
          length: BOOK_SPECIFICATIONS[formData.trim_size_id]?.length || 0,
          width: BOOK_SPECIFICATIONS[formData.trim_size_id]?.width || 0,
          height: weightInfo.spineThickness
        },
        quantity: weightInfo.quantity,
        description: `${weightInfo.quantity}x ${weightInfo.bookSize} (${weightInfo.pageCount} pages, ${weightInfo.bindingType})`
      };
    } catch (error) {
      console.error('Error calculating yearbook specifications:', error);
      return null;
    }
  }
  
  // Handle Magazine format (same as YearBook)
  if (formData.trim_size_id && formData.page_count && formData.binding_id && 
      formData.paper_type_id && formData.quantity) {
    try {
      const weightInfo = calculateBookWeight({
        bookSize: formData.trim_size_id,
        pageCount: parseInt(formData.page_count),
        paperType: formData.paper_type_id,
        bindingType: formData.binding_id,
        quantity: parseInt(formData.quantity)
      });

      return {
        totalWeight: weightInfo.totalWeight,
        packaging: weightInfo.packaging,
        dimensions: {
          length: BOOK_SPECIFICATIONS[formData.trim_size_id]?.length || 0,
          width: BOOK_SPECIFICATIONS[formData.trim_size_id]?.width || 0,
          height: weightInfo.spineThickness
        },
        quantity: weightInfo.quantity,
        description: `${weightInfo.quantity}x ${weightInfo.bookSize} (${weightInfo.pageCount} pages, ${weightInfo.bindingType})`
      };
    } catch (error) {
      console.error('Error calculating magazine specifications:', error);
      return null;
    }
  }
  
  // Handle PhotoBook format (same as PrintBook)
  if (formData.bookSize && formData.page_count && formData.binding_id && 
      formData.paper_type_id && formData.quantity) {
    try {
      const weightInfo = calculateBookWeight({
        bookSize: formData.bookSize,
        pageCount: parseInt(formData.page_count),
        paperType: formData.paper_type_id,
        bindingType: formData.binding_id,
        quantity: parseInt(formData.quantity)
      });

      return {
        totalWeight: weightInfo.totalWeight,
        packaging: weightInfo.packaging,
        dimensions: {
          length: BOOK_SPECIFICATIONS[formData.bookSize]?.length || 0,
          width: BOOK_SPECIFICATIONS[formData.bookSize]?.width || 0,
          height: weightInfo.spineThickness
        },
        quantity: weightInfo.quantity,
        description: `${weightInfo.quantity}x ${weightInfo.bookSize} (${weightInfo.pageCount} pages, ${weightInfo.bindingType})`
      };
    } catch (error) {
      console.error('Error calculating photobook specifications:', error);
      return null;
    }
  }
  
  return null;
};
