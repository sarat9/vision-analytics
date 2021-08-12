import { combineReducers } from 'redux'
import dashboard from './dashboard'
import shop from './shop'
import product from './product'

export default combineReducers({
    dashboard,
    shop,
    product
})