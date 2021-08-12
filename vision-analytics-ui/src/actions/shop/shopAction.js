
export function setGenderFilter(payload) {
    return { type: 'GENDER_FILTER', payload }
}

export function setSelectedBrandFilter(payload={}) {
    return { type: 'SELECTED_BRAND_FILTER', payload }
}

export function setSelectedDiscountRangeFilter(payload={}) {
    return { type: 'DISCOUNT_RANGE_FILTER', payload }
}




export const downloadChargeCodeReport = (reportData) => (dispatch) => {
};