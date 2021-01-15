import {LOGIN_USER} from './actionTypes'

/// USER ACTIONS ///

export function loginUser(userObj){
    console.log(userObj)
    return function (dispatch){
        fetch('http://localhost:3000/api/users/login',{
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
                  console.log("found user", data['user_name'])
                  localStorage.setItem("USER_DATA", JSON.stringify(data))
                  dispatch ({ type: LOGIN_USER, payload: data})
              } else {
                  console.log("user not found")
                  window.alert("Wrong Username or Password Please Try Again")
              }
          })
          .catch(console.log)
    }

}