export function postReducer(state = false, action) {
  switch (action.type) {
    case 'VISIBLE':
      return true;
    case 'HIDDEN':
      return false;

    default:
      return state;
  }
}
