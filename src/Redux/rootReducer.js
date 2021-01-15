import { combineReducers } from 'redux'


const defaultState = {
    user: null
}

function userReducer(prevState = defaultState.user, action){
    switch (action.type) {
        case "LOGIN_USER":
            console.log("From userReducer: ", action.payload)
            return prevState
        default:
            return prevState
    }

}
const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer