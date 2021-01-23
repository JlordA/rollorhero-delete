import { bindActionCreators } from 'redux'
import { GET_DELIS, LOGIN_USER, REVIEW_FORM, SANDWICH_FILTER, DELI_FILTER, GET_REVIEWS, REVIEW_CLICK, RENDER_REVIEW, CURRENT_DELI, POST_REVIEW, REVIEW_EDIT_CLICK, PATCH_REVIEW, GET_DELI, GET_SANDWICHES, GET_SANDWICH, SANDWICH_CLICK, POST_LIKE, FIND_DELI, DELI_FORM, POST_DELI, RESET_DELI_LOCATION } from './actionTypes'

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
                    console.log("found user", data['username'])
                    localStorage.setItem("USER_DATA", data)
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

export function setSearchLocation(deliLocation) {
    return { type: FIND_DELI, payload: deliLocation }
}

export function resetDeliLocation(){
    return { type: RESET_DELI_LOCATION }
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

export function getDeliOfReview(deli_id) {
    // console.log(deli_id)
    return function (dispatch) {
        fetch(`http://localhost:3000/api/delis/${deli_id}`)
            .then(r => r.json())
            .then(deliFromReview => {
                dispatch({ type: GET_DELI, payload: deliFromReview })
            })
    }
}

export function currentDeli(deliObj) {
    return { type: CURRENT_DELI, payload: deliObj }
}

export function renderDeliForm() {
    console.log("working")
    return { type: DELI_FORM }
}

export function postDeli(deliObj) {
    console.log(deliObj)
    return function (dispatch) {
        fetch('http://localhost:3000/api/delis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deliObj),
        })
            .then(response => response.json())
            .then(newDeli => {
                dispatch({ type: POST_DELI, payload: newDeli })
                console.log('Success:', newDeli);
            })
    }
}

/// SANDWICH ACTIONS ///

export function getSandwiches() {
    return function (dispatch) {
        fetch('http://localhost:3000/api/sandwiches')
            .then(r => r.json())
            .then(arrayOfSandwiches => {
                dispatch({ type: GET_SANDWICHES, payload: arrayOfSandwiches })
            })
    }
}

export function getSandwich(sandwichObj) {
    return function (dispatch) {
        fetch(`http://localhost:3000/api/sandwiches/${sandwichObj.id}`)
            .then(r => r.json())
            .then(sandwich => {
                dispatch({ type: GET_SANDWICH, payload: sandwich })
                console.log("success", sandwich)
            })
    }
}

export function sandwichBeenClicked() {
    return { type: SANDWICH_CLICK }
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
                dispatch({ type: POST_REVIEW, payload: newReview })
                console.log('Success:', newReview);
            })
    }
}

export function patchReview(reviewObj) {
    console.log(reviewObj.id)
    return function (dispatch) {
        fetch(`http://localhost:3000/api/reviews/${reviewObj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewObj),
        })
            .then(response => response.json())
            .then(updatedReview => {
                dispatch({ type: PATCH_REVIEW, payload: updatedReview })
                console.log('Success:', updatedReview);
            })
    }
}


/// LIKE ACTIONS ///
export function likeSandwich(newLike) {
    console.log(newLike)
    return function (dispatch) {
        fetch(`http://localhost:3000/api/likes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLike),
        })
            .then(response => response.json())
            .then(newLike => {
                dispatch({ type: POST_LIKE, payload: newLike })
                console.log('Success:', newLike);
            }
            )
    }
}