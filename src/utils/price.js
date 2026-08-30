/**
 * Price & Discount Calculator Utility for KFSSEC
 */

export function calculateDiscount(originalPriceStr, discountStr) {
  if (!originalPriceStr) {
    return {
      originalPriceStr: '0원',
      discountedPriceStr: '0원',
      ratePercent: 0,
      hasDiscount: false,
    };
  }

  const origNum = parseInt(String(originalPriceStr).replace(/[^0-9]/g, ''), 10) || 0;
  
  // Extract percentage number from discount string like "20% OFF", "20%", "15% OFF"
  const match = String(discountStr || '').match(/(\d+)%/);
  const percent = match ? parseInt(match[1], 10) : 0;

  if (percent > 0 && origNum > 0) {
    const discountedNum = Math.floor((origNum * (100 - percent)) / 100);
    return {
      originalPriceStr: origNum.toLocaleString() + '원',
      discountedPriceStr: discountedNum.toLocaleString() + '원',
      ratePercent: percent,
      hasDiscount: true,
    };
  }

  return {
    originalPriceStr: origNum.toLocaleString() + '원',
    discountedPriceStr: origNum.toLocaleString() + '원',
    ratePercent: 0,
    hasDiscount: false,
  };
}
