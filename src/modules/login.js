import axios from 'axios';

export const AUTH_REQUEST = 'login/REQUEST_AUTH';
export const AUTH_REQUEST_SUCCESS = 'login/REQUEST_AUTH/success'
export const AUTH_REQUEST_FAILURE = 'login/REQUEST_AUTH/failure'

const initialState = {
  isFetching: false,
  token: '',
  user: {},
  error: ''
}
/*
user: {
  id: <num>
  name: <string>
  email: <string>
}
*/

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: payload.data.user,
        token: payload.data.token
      }
    case AUTH_REQUEST_FAILURE: 
      return {
        ...state,
        isFetching: false,
        error: payload.error
      }
    default:
      return state
  }
}

export const requestAuth = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: AUTH_REQUEST })
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password })
    if (!data) {
      dispatch({ type: AUTH_REQUEST_FAILURE, payload: { error: 'No data returned by server.' } })
    }
    if (data.success) {
      dispatch({ type: AUTH_REQUEST_SUCCESS, payload: data })
    }
    if (data.error) {
      dispatch({ type: AUTH_REQUEST_FAILURE, payload: data })
    }
  }
  catch (ex) {
    const { status, data: { error } } = ex.response
    dispatch({ type: AUTH_REQUEST_FAILURE, payload: { error: `${status} - ${error}` }})
  }
}
