
const initialState = { isLoading: false }


export default function shop(state = initialState, action) {
    switch (action.type) {
        case 'SET_WISHLISTED_DATA':
            return { ...state, wishlisted: action.payload };
        case 'ADD_TO_WISHLIST':
            return { ...state, wishlisted: action.payload };
        default:
            return state
    }
}