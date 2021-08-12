
const initialState = { isLoading: false }


export default function dashboard(state = initialState, action) {
    switch (action.type) {
        case 'USER_NAME':
            return { ...state, userName: action.payload };
        default:
            return state
    }
}

