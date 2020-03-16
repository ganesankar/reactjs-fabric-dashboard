import { GET_POST, ADD_POST, REMOVE_POST } from "../actions/types";

const initState = [];

export default function(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POST:
      return [...state, ...payload];

    case ADD_POST:
      return [payload, ...state];

    case REMOVE_POST:
      return [...state.filter(item => item.id !== payload)];

    default:
      return state;
  }
}
