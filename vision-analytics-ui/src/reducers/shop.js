
const initialState = { genderFilter: null, selectedBrandFilter:{}, isLoading: false }


export default function shop(state = initialState, action) {
    switch (action.type) {
        case 'GENDER_FILTER':
            return { ...state, genderFilter: action.payload };
        case 'SELECTED_BRAND_FILTER':
            return { ...state, selectedBrandFilter: action.payload };
        case 'DISCOUNT_RANGE_FILTER':
            return { ...state, discountRangeFilter: action.payload };
        case 'CLEAR_FILTER':
            return { ...state, genderFilter: null, selectedBrandFilter: {}, discountFilter: null};
        default:
            return state
    }
}