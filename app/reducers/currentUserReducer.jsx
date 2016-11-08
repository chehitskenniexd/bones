'use strict'

import { CREATE_A_USER, LOGOUT_A_USER } from '../actions/userActions';

var initUser = JSON.parse(localStorage.getItem('user'));
// console.log('init cart ', initCart);


// Reducer for current user
export default function currentUserReducer(prevState = initUser || {}, action) {
    switch (action.type) {
        case CREATE_A_USER: {
            checkoutLocalStorage(action.currentUser);
            return action.currentUser;
        };
        case LOGOUT_A_USER: {
            checkoutLocalStorage({});
            return action.currentUser;
        }
        default: {
            return prevState;
        }
    }
}
function checkoutLocalStorage (user) {
  // localStorage.clear();
  // console.log('cart ', cart);
  user = JSON.stringify(user);
  localStorage.setItem('user', user);
  console.log('local ', localStorage);
}
