import { Reducer } from "redux";
import { LogInRequestAction, LogInSuccessAction, LogInSuccessData, LogoutAction } from "../actions/user";

interface initialState {
  isLoggingIn: boolean;
  loading: boolean;
  data: LogInSuccessData | null;
}
const initialState = {
  isLoggingIn: false,
  loading: false,
  data: null,
};

// 길어져서 분리
type UserReducerActions = LogInSuccessAction | LogoutAction | LogInRequestAction;
// 다른 액션이 들어가지 않도록 action부터 타이핑
// typeof initialState를 넣게 되면 LOG_OUT때문에 들어가지 않음 -> interface만들어 처리
const userReducer: Reducer<initialState, UserReducerActions> = (prevState = initialState, action) => {
  // 새로운 state 만들어주기
  switch (action.type) {
    case "LOG_IN_REQUEST":
      return {
        ...prevState,
        loading: true,
      };
    case "LOG_IN_SUCCESS":
      return {
        ...prevState,
        loading: false,
        data: action.data,
      };
    case "LOG_OUT":
      return {
        ...prevState,
        data: null,
      };
    default:
      return prevState;
  }
};

export default userReducer;
