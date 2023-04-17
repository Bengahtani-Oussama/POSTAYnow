import Cookies from 'js-cookie';

export function userReducer(
  state = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
  action
) {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    case 'UPLOADPROFILEPIC':
      return { ...state, picture: action.payload };
    case 'VERIFY':
      return { ...state, verified: action.payload };

    default:
      return state;
  }
}
