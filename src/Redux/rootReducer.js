import { combineReducers } from 'redux'


const defaultState = {
    user: null,
    deli: {},
    review: {},
    delis: [],
    reviews: [],
    reviewFormClicked: false,
    reviewBeenClicked: false,
    reviewEditClicked: false,
    sandwichFilter: "",
    deliFilter: ""
}

function userReducer(prevState = defaultState.user, action) {
    switch (action.type) {
        case "LOGIN_USER":
            console.log("From userReducer: ", action.payload)
            return action.payload
        default:
            return prevState
    }
}

function delisReducer(prevState = defaultState.delis, action) {
    switch (action.type) {
        case "GET_DELIS":
            // console.log("From delisReducer: ", action.payload)
            return action.payload
        default:
            return prevState
    }
}

function deliReducer(prevState = defaultState.deli, action) {
    switch (action.type) {
        case "CURRENT_DELI":
            // console.log("from deliReducer: ", action.payload)
            return action.payload
        default:
            return prevState
    }
}

function deliStyleReducer(prevState = defaultState.deliFilter, action) {
    switch (action.type) {
        case "DELI_FILTER":
            // console.log("From delisReducer: ", action.payload)
            return action.payload
        default:
            return prevState
    }
}

function sandwichReducer(prevState = defaultState.sandwichFilter, action) {
    switch (action.type) {
        case "SANDWICH_FILTER":
            // console.log("in sandwichReducer: ", action.payload)
            return action.payload
        default:
            return prevState
    }
}

function reviewClickReducer(prevState = defaultState.reviewFormClicked, action) {
    switch (action.type) {
        case "REVIEW_FORM":
            // console.log("from Review Reducer: ", action)
            return !prevState
        default:
            return prevState
    }
}

function reviewsReducer(prevState = defaultState.reviews, action) {
    switch (action.type) {
        case "GET_REVIEWS":
            return action.payload
        case "POST_REVIEW":
            return [action.payload, ...prevState]
        default:
            return prevState
    }
}

function reviewBeenClickReducer(prevState = defaultState.reviewBeenClicked, action) {
    switch (action.type) {
        case "REVIEW_CLICK":
            return !prevState
        default:
            return prevState
    }
}

function reviewReducer(prevState = defaultState.review, action) {
    switch (action.type) {
        case "RENDER_REVIEW":
            return action.payload
        default:
            return prevState
    }
}

function reviewEditClickedReducer(prevState = defaultState.reviewEditClicked, action){
    switch (action.type) {
        case "REVIEW_EDIT_CLICK":
            console.log("in edit click reducer: ", prevState)
            return !prevState
        default:
            return prevState
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    delis: delisReducer,
    reviewFormClicked: reviewClickReducer,
    sandwichFilter: sandwichReducer,
    deliFilter: deliStyleReducer,
    reviews: reviewsReducer,
    reviewBeenClicked: reviewBeenClickReducer,
    reviewEditClicked: reviewEditClickedReducer,
    review: reviewReducer,
    deli: deliReducer
})

export default rootReducer