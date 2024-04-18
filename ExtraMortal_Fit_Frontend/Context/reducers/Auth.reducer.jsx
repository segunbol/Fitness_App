import { SET_CURRENT_USER } from "../Actions/Auth.actions";
import isEmpty from "../../constants/is-empty";

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
        // console.log(action)
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        userProfile: action.userProfile,
      };
    default:
      return state;
  }
}
