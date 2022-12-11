import { Dispatch, AnyAction } from "redux";

export type LogInRequestData = { nickname: string; password: string };

export const logIn = (data: LogInRequestData) => {
  // async action creator
  return (dispatch: Dispatch<AnyAction>, getState: () => any) => {
    // async action
    dispatch(logInRequest(data));
    try {
      setTimeout(() => {
        dispatch(
          logInSuccess({
            userId: 1,
            nickname: "zerocho",
          })
        );
      }, 2000);
    } catch (e) {
      dispatch(logInFailure(e));
    }
  };
};

export type LogInRequestAction = { type: "LOG_IN_REQUEST"; data: LogInRequestData };
// 원래 action은 아래처럼 객체지만 thunk라는 미들웨어를 만들면 action을 함수꼴로 만들 수 있다
const logInRequest = (data: LogInRequestData): LogInRequestAction => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};

export type LogInSuccessData = { userId: number; nickname: string };
export type LogInSuccessAction = {
  type: "LOG_IN_SUCCESS";
  data: LogInSuccessData;
};

const logInSuccess = (data: LogInSuccessData): LogInSuccessAction => {
  return {
    type: "LOG_IN_SUCCESS",
    data,
  };
};

// LogInErrorData이런식으로 만들어서 쓰면 됨
const logInFailure = (error: any) => {
  return {
    type: "LOG_IN_FAILURE",
    error,
  };
};

export type LogoutAction = { type: "LOG_OUT" };
export const logOut = (): LogoutAction => {
  return {
    // action
    type: "LOG_OUT",
  };
};

export default {
  logIn,
  logOut,
};
