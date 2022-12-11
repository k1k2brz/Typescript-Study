import { legacy_createStore as createStore, compose, applyMiddleware, Middleware } from "redux";
import reducer from "./reducers";
import { addPost } from "./actions/post";
import { logIn, logOut } from "./actions/user";
import { ThunkMiddleware } from "redux-thunk";

const initialState = {
  user: {
    isLoggingIn: true,
    loading: false,
    data: null,
  },
  posts: [],
};

// Middleware는 redux자체 타입에 있음
// api는 store고 next는 dispatch와 같음
const firstMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("로깅", action);
  next(action);
};

const thunkMiddleware: Middleware = (store) => (next) => (action) => {
  // 액션이 함수면
  if (typeof action === "function") {
    // 비동기
    return action(store.dispatch, store.getState);
  }
  // 함수가 아니면
  return next(action); // 동기
};

const enhancer = applyMiddleware(firstMiddleware, thunkMiddleware as ThunkMiddleware);

const store = createStore(reducer, initialState, enhancer);
export type RootState = ReturnType<typeof store.getState>;
// ThunkDispatch까지 포함됨
export type AppDispatch = typeof store.dispatch;

console.log("1st", store.getState());

// --------------------------------------

// dispatch가 thunk도 받아들일 수 있도록 타입 설정
// thunkMiddleware에 as 타입
store.dispatch(
  logIn({
    nickname: "Kelly",
    password: "123123123123",
  })
);
console.log("2nd", store.getState());
//
// store.dispatch(addPost({
//   userId: 1,
//   id: 1,
//   content: '안녕하세요. 리덕스',
// }));
// console.log('3rd', store.getState());
store.dispatch(
  addPost({
    title: "제목",
    content: "두번째 리덕스",
  })
);
// console.log('4th', store.getState());
//
// store.dispatch(logOut());
// console.log('5th', store.getState());

export { store };
