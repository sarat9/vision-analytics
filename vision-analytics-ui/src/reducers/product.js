
const initialState = { productData:{}, isLoading: false }


export default function product(state = initialState, action) {
    switch (action.type) {
        case 'OPEN_PRODUCT_DATA':
            return { ...state, openedProductData: action.payload };
        default:
            return state
    }
}