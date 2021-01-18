import { bindActionCreators } from 'redux'
import { GET_DELIS, LOGIN_USER, REVIEW_FORM, SANDWICH_FILTER, DELI_FILTER, GET_REVIEWS, REVIEW_CLICK, RENDER_REVIEW, CURRENT_DELI, POST_REVIEW, REVIEW_EDIT_CLICK } from './actionTypes'

/// USER ACTIONS ///

export function loginUser(userObj) {
    console.log(userObj)
    return function (dispatch) {
        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accepts": "application.json"
            },
            body: JSON.stringify(userObj),
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    // console.log("found user", data['username'])
                    localStorage.setItem("USER_DATA", JSON.stringify(data))
                    dispatch({ type: LOGIN_USER, payload: data })
                } else {
                    console.log("user not found")
                    window.alert("Wrong Username or Password Please Try Again")
                }
            })
            .catch(console.log)
    }

}

/// FILTER ACTIONS ///

export function setSandwichFilter(sandFilter) {
    return { type: SANDWICH_FILTER, payload: sandFilter }
}

export function setDeliFilter(deliFilter) {
    return { type: DELI_FILTER, payload: deliFilter }
}

/// DELI ACTIONS ///

export function getDelis() {
    return function (dispatch) {
        fetch('http://localhost:3000/api/delis')
            .then(r => r.json())
            .then(arrayOfDelis => {
                dispatch({ type: GET_DELIS, payload: arrayOfDelis })
            })
    }
}

export function currentDeli(deliObj) {
    return { type: CURRENT_DELI, payload: deliObj }
}

/// REVIEW ACTIONS ///

export function renderReviewForm() {
    return { type: REVIEW_FORM }
}

export function reviewClick() {
    return { type: REVIEW_CLICK }
}

export function renderReview(reviewObj) {
    return { type: RENDER_REVIEW, payload: reviewObj }
}

export function reviewEditClicked() {
    return { type: REVIEW_EDIT_CLICK }
}

export function getReviews() {
    return function (dispatch) {
        fetch('http://localhost:3000/api/reviews')
            .then(r => r.json())
            .then(arrayOfReviews => {
                dispatch({ type: GET_REVIEWS, payload: arrayOfReviews })
            })
    }
}

export function postReview(reviewObj) {

    return function (dispatch) {
        fetch('http://localhost:3000/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewObj),
        })
            .then(response => response.json())
            .then(newReview => {
                dispatch({ type: POST_REVIEW, payload: newReview})
                console.log('Success:', newReview);
            })
    }
}