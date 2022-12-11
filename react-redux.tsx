import React from "react";
import { useSelector, useDispatch, connect, Provider } from "react-redux";
import { logIn, logOut } from "./actions/user";
import { AppDispatch, RootState, store } from "./redux2";

const App = () => {
  // state: RootState와 같지만 더 정확하게 하는 방법
  //   const { loading, data } = useSelector<RootState, RootState["user"]>((state) => state.user);
  const { loading, data } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  // connect가 너무 많은걸 담당해서 useSelector와 useDispatch로 쪼갠 것

  const onClick = () => {
    dispatch(
      logIn({
        nickname: "zerocho",
        password: "비밀번호",
      })
    );
  };

  const onLogout = () => {
    dispatch(logOut());
  };

  return (
    <div>
      {loading ? <div>로그인 중</div> : data ? <div>{data.nickname}</div> : "로그인 해주세요."}
      {!data ? <button onClick={onClick}>로그인</button> : <button onClick={onLogout}>로그아웃</button>}
    </div>
  );
};

export default App;

const Parent = () => {
  <Provider store={store}>
    <App />
  </Provider>
}